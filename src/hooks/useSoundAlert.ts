import { useEffect, useRef } from 'react';

type AlertType = 'cattle' | 'fire' | null;

export const useSoundAlert = (activeAlertType: AlertType) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const speechIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup previous sounds
    const cleanup = () => {
      // Stop oscillator
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {
          // ignore
        }
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      // Stop speech
      if (speechIntervalRef.current) {
        clearInterval(speechIntervalRef.current);
        speechIntervalRef.current = null;
      }
      window.speechSynthesis.cancel();
    };

    cleanup();

    if (activeAlertType === 'cattle') {
      // Initialize Audio Context for Siren
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;

      // Siren pattern
      for (let i = 0; i < 20; i++) {
        osc.frequency.setValueAtTime(800, now + i);
        osc.frequency.linearRampToValueAtTime(1200, now + i + 0.5);
      }

      gain.gain.value = 0.1;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

    } else if (activeAlertType === 'fire') {
      // Siren for Fire (Squary/Pulse)
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      const now = ctx.currentTime;

      // Fast pulsing siren pattern
      for (let i = 0; i < 20; i++) {
        osc.frequency.setValueAtTime(600, now + i);
        osc.frequency.setValueAtTime(900, now + i + 0.2);
        osc.frequency.setValueAtTime(600, now + i + 0.4);
      }

      gain.gain.value = 0.15;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    }

    return cleanup;
  }, [activeAlertType]);

  // Global cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      window.speechSynthesis.cancel();
    };
  }, []);
};
