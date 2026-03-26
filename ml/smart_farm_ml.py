"""
Smart Farm Guardian - Offline ML Simulation (with visualization & noise injection)
---------------------------------------------------------------------------------
This script replicates the data science workflow used by the dashboard. It trains
the crop recommendation and cattle detection models, adds light noise during
training to mimic real-world conditions, and visualizes key evaluation metrics.
"""

from __future__ import annotations

import time
from pathlib import Path
from typing import List, Tuple

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier

plt.style.use("default")
sns.set_palette("husl")

CROP_DATA_PATH = Path("Crop_recommendation.csv")
ANIMAL_DATA_PATH = Path("animal_activity_sample.csv")


def train_crop_model(
    df: pd.DataFrame,
) -> Tuple[VotingClassifier, LabelEncoder, StandardScaler]:
    print("\n--- Training Crop Prediction Model (Ensemble Learning) ---")
    feature_cols = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
    X = df[feature_cols]
    y = df["label"]

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )

    noise_factor = 0.05
    X_train_noisy = X_train + noise_factor * np.random.normal(0, X_train.std(), X_train.shape)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train_noisy)
    X_test_scaled = scaler.transform(X_test)

    estimators = [
        ("lr", LogisticRegression(max_iter=5_000, random_state=42)),
        ("dt", DecisionTreeClassifier(random_state=42)),
        ("rf", RandomForestClassifier(n_estimators=100, random_state=42)),
    ]

    ensemble_model = VotingClassifier(estimators=estimators, voting="soft")
    ensemble_model.fit(X_train_scaled, y_train)

    y_pred = ensemble_model.predict(X_test_scaled)
    print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")

    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Blues",
        xticklabels=label_encoder.classes_,
        yticklabels=label_encoder.classes_,
    )
    plt.title("Crop Prediction Model - Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.show()

    print("Crop Model Training Complete.")
    return ensemble_model, label_encoder, scaler


def train_cattle_model(df: pd.DataFrame) -> Tuple[RandomForestClassifier, List[str]]:
    print("\n--- Training Cattle Detection Model ---")
    df = df.copy()
    df["Movement_Alert"] = df["label"].apply(lambda x: 1 if x in ["walking", "running"] else 0)

    feature_cols = ["ax", "ay", "az", "gx", "gy", "gz"]
    X = df[feature_cols]
    y = df["Movement_Alert"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )

    noise_factor = 0.1
    X_train_noisy = X_train + noise_factor * np.random.normal(0, X_train.std(), X_train.shape)

    cattle_model = RandomForestClassifier(
        n_estimators=100, random_state=42, class_weight="balanced"
    )
    cattle_model.fit(X_train_noisy, y_train)

    y_pred = cattle_model.predict(X_test)
    print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print(
        "\nAlarm Classification Report:\n",
        classification_report(
            y_test,
            y_pred,
            labels=[0, 1],
            target_names=["Stationary", "Movement"],
            zero_division=0,
        ),
    )

    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(6, 4))
    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Reds",
        xticklabels=["Stationary", "Movement"],
        yticklabels=["Stationary", "Movement"],
    )
    plt.title("Cattle Detection Model - Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.show()

    print("Cattle Detection Model Training Complete.")
    return cattle_model, feature_cols


def simulate_sensor_reading(
    crop_scaler: StandardScaler, cattle_features: List[str]
) -> Tuple[np.ndarray, pd.DataFrame, dict]:
    print("\n[SENSOR] Reading Current Environmental Conditions...")
    soil_data = {
        "N": 80,
        "P": 45,
        "K": 45,
        "temperature": 25.5,
        "humidity": 81.0,
        "ph": 6.8,
        "rainfall": 200.0,
    }
    cattle_data_point = np.array([[-6.5, 5.5, -5.0, -25.0, -6.0, 8.5]])
    current_conditions_scaled = crop_scaler.transform(pd.DataFrame([soil_data]))
    cattle_df = pd.DataFrame(cattle_data_point, columns=cattle_features)
    return current_conditions_scaled, cattle_df, soil_data


def predict_crop(
    model: VotingClassifier, label_encoder: LabelEncoder, current_conditions: np.ndarray
) -> Tuple[str, str, str, float]:
    prediction = model.predict(current_conditions)
    best_crop = label_encoder.inverse_transform(prediction)[0]

    current_crop_name = "rice"
    current_crop_prob = 0.0
    try:
        current_crop_index = label_encoder.transform([current_crop_name])[0]
        probs = model.predict_proba(current_conditions)[0]
        current_crop_prob = probs[current_crop_index]
        if current_crop_prob > 0.50:
            viability_status = f"GOOD (High Confidence: {current_crop_prob*100:.2f}%)"
        elif current_crop_prob > 0.20:
            viability_status = f"FAIR (Moderate Confidence: {current_crop_prob*100:.2f}%)"
        else:
            viability_status = f"POOR (Low Confidence: {current_crop_prob*100:.2f}%) - Needs urgent attention."
    except ValueError:
        viability_status = "Unknown/Untrained Crop"

    return best_crop, current_crop_name, viability_status, current_crop_prob


def detect_cattle(model: RandomForestClassifier, cattle_data: pd.DataFrame) -> bool:
    prediction = model.predict(cattle_data)
    return bool(np.any(prediction == 1))


def trigger_alarm(is_cattle_detected: bool, sleep_duration: int = 3) -> None:
    if is_cattle_detected:
        print("\n\n" + "=" * 50)
        print("!!! INTRUSION ALERT: UNWANTED CATTLE DETECTED !!!")
        print("!!! ALARM TRIGGERED: Sending signal to deterrent/fence. !!!")
        print("=" * 50 + "\n\n")
        time.sleep(sleep_duration)
        print("Alarm cycle complete. System returning to monitoring mode.")
    else:
        print("[ALARM SYSTEM] Field is clear. Monitoring movement...")


def visualize_feature_distributions(crop_df: pd.DataFrame, animal_df: pd.DataFrame) -> None:
    print("\n--- Data Visualization: Feature Distributions ---")
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    crop_features = ["N", "P", "K", "temperature", "humidity", "rainfall"]
    for i, feat in enumerate(crop_features):
        ax = axes[i // 3, i % 3]
        sns.histplot(crop_df[feat], ax=ax, kde=True)
        ax.set_title(f"Crop Data: {feat}")
    plt.tight_layout()
    plt.show()

    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    cattle_features = ["ax", "ay", "az", "gx", "gy", "gz"]
    for i, feat in enumerate(cattle_features):
        ax = axes[i // 3, i % 3]
        sns.histplot(animal_df[feat], ax=ax, kde=True)
        ax.set_title(f"Cattle Data: {feat}")
    plt.tight_layout()
    plt.show()


def summarize_simulation(cycles: List[int], crop_confidences: List[float], alarm_statuses: List[int]) -> None:
    print("\n--- Simulation Visualization ---")
    fig, ax1 = plt.subplots(figsize=(10, 6))
    ax1.plot(cycles, crop_confidences, marker="o", label="Crop Confidence (Rice)", color="blue")
    ax1.set_xlabel("Monitoring Cycle")
    ax1.set_ylabel("Crop Confidence", color="blue")
    ax1.tick_params(axis="y", labelcolor="blue")

    ax2 = ax1.twinx()
    ax2.bar(cycles, alarm_statuses, alpha=0.5, label="Alarm Triggered (1=Yes)", color="red")
    ax2.set_ylabel("Alarm Status", color="red")
    ax2.tick_params(axis="y", labelcolor="red")

    plt.title("Simulation Results: Crop Confidence and Alarm Status Over Cycles")
    fig.legend(loc="upper right")
    plt.tight_layout()
    plt.show()


def main() -> None:
    try:
        crop_df = pd.read_csv(CROP_DATA_PATH)
        animal_df = pd.read_csv(ANIMAL_DATA_PATH)
    except FileNotFoundError as exc:
        print(
            f"Error loading dataset: {exc}. "
            "Please ensure 'Crop_recommendation.csv' and 'animal_activity_sample.csv' "
            "are available next to this script."
        )
        return

    visualize_feature_distributions(crop_df, animal_df)
    crop_model, crop_encoder, crop_scaler = train_crop_model(crop_df)
    cattle_model, cattle_features = train_cattle_model(animal_df)

    print("\n" + "=" * 70)
    print("SMART FARMING SYSTEM INITIALIZED & ONLINE (IoT Simulation Mode)")
    print("=" * 70)

    cycles: List[int] = []
    crop_confidences: List[float] = []
    alarm_statuses: List[int] = []

    for i in range(1, 4):
        print(f"\n--- Monitoring Cycle {i} ---")
        cycles.append(i)

        current_conditions_scaled, cattle_data_df, soil_data = simulate_sensor_reading(
            crop_encoder, crop_scaler, cattle_features
        )

        best_crop, current_crop, viability_status, crop_prob = predict_crop(
            crop_model, crop_encoder, current_conditions_scaled
        )
        crop_confidences.append(crop_prob)

        print("\n[CROP ANALYSIS REPORT]")
        print("-" * 30)
        print(
            f"Current Water Content (Humidity/Rainfall): "
            f"{soil_data['humidity']:.2f}% | {soil_data['rainfall']:.2f}mm"
        )
        print(
            f"Soil Type (N/P/K/pH): N={soil_data['N']}, P={soil_data['P']}, "
            f"K={soil_data['K']}, pH={soil_data['ph']:.2f}"
        )
        print(f"Current Crop ({current_crop}) Status: {viability_status}")
        print(f"PREDICTED BEST CROP: {best_crop}")

        is_cattle_detected = detect_cattle(cattle_model, cattle_data_df)
        alarm_statuses.append(1 if is_cattle_detected else 0)
        trigger_alarm(is_cattle_detected, sleep_duration=1)

        if i < 3:
            print("\n... Pausing before next cycle (simulating time passing) ...")
            time.sleep(2)

    summarize_simulation(cycles, crop_confidences, alarm_statuses)
    print("\nSimulation complete. System remains in active monitoring.")


if __name__ == "__main__":
    main()

