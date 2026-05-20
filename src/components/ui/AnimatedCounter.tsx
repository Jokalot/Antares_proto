'use client';
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  // Just display the value — animation is handled at the section level
  return <span ref={ref}>{value}</span>;
}
