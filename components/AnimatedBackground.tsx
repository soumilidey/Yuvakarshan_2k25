import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  dotCount?: number;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  speed?: number;
}

interface Dot {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  size: number;
  color: string;
  directionX: number;
  directionY: number;
  speedMultiplier: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  dotCount = 12,
  primaryColor = "#667eea",
  secondaryColor = "#764ba2",
  backgroundColor = "#f8fafc",
  speed = 1,
}) => {
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Generate random dots with initial positions and properties
  const generateDots = (): Dot[] => {
    const dots: Dot[] = [];
    const colors = [
      primaryColor,
      secondaryColor,
      "#ffd700",
      "#ff6b6b",
      "#4ecdc4",
    ];

    for (let i = 0; i < dotCount; i++) {
      const size = Math.random() * 8 + 4; // Size between 4-12
      const dot: Dot = {
        id: i,
        x: new Animated.Value(Math.random() * screenWidth),
        y: new Animated.Value(Math.random() * screenHeight),
        scale: new Animated.Value(Math.random() * 0.5 + 0.3), // Scale between 0.3-0.8
        opacity: new Animated.Value(Math.random() * 0.4 + 0.1), // Opacity between 0.1-0.5
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        directionX: Math.random() > 0.5 ? 1 : -1,
        directionY: Math.random() > 0.5 ? 1 : -1,
        speedMultiplier: Math.random() * 0.8 + 0.4, // Speed between 0.4-1.2
      };
      dots.push(dot);
    }

    return dots;
  };

  // Animate a single dot
  const animateDot = (dot: Dot) => {
    const duration = (Math.random() * 8000 + 12000) / speed; // 12-20 seconds divided by speed
    const newX = Math.random() * screenWidth;
    const newY = Math.random() * screenHeight;
    const newScale = Math.random() * 0.5 + 0.3;
    const newOpacity = Math.random() * 0.4 + 0.1;

    return Animated.parallel([
      Animated.timing(dot.x, {
        toValue: newX,
        duration: duration * dot.speedMultiplier,
        useNativeDriver: false,
      }),
      Animated.timing(dot.y, {
        toValue: newY,
        duration: duration * dot.speedMultiplier,
        useNativeDriver: false,
      }),
      Animated.timing(dot.scale, {
        toValue: newScale,
        duration: duration * 0.7,
        useNativeDriver: true,
      }),
      Animated.timing(dot.opacity, {
        toValue: newOpacity,
        duration: duration * 0.8,
        useNativeDriver: true,
      }),
    ]);
  };

  // Create continuous animation loop
  const startAnimation = () => {
    const animations = dotsRef.current.map((dot) => animateDot(dot));

    animationRef.current = Animated.stagger(
      200, // Stagger by 200ms
      animations
    );

    animationRef.current.start(() => {
      // Restart animation when complete
      startAnimation();
    });
  };

  useEffect(() => {
    dotsRef.current = generateDots();
    startAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotCount, speed, primaryColor, secondaryColor]);

  const renderDot = (dot: Dot) => (
    <Animated.View
      key={dot.id}
      style={[
        styles.dot,
        {
          left: dot.x,
          top: dot.y,
          width: dot.size,
          height: dot.size,
          backgroundColor: dot.color,
          transform: [{ scale: dot.scale }],
          opacity: dot.opacity,
        },
      ]}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Animated dots layer */}
      <View style={styles.dotsContainer}>{dotsRef.current.map(renderDot)}</View>

      {/* Gradient overlay for depth */}
      <View style={styles.gradientOverlay} />

      {/* Content layer */}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  dotsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  dot: {
    position: "absolute",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    zIndex: 3,
    position: "relative",
  },
});

export default AnimatedBackground;
