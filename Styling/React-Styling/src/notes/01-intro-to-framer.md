# Mastering Framer Motion: Advanced Animation Guide

## Introduction

Framer Motion is a powerful animation library for React that makes creating complex animations surprisingly simple. However, as you start building more complex interfaces with nested animations, modals, and exit animations, you may encounter some challenges that aren't immediately obvious from the documentation. This guide will delve into these advanced topics, with a focus on modal animations, staggered lists, and proper animation orchestration.

## Table of Contents

1. [Understanding Framer Motion's Core Concepts](#understanding-framer-motions-core-concepts)
2. [Working with Modals](#working-with-modals)
3. [Staggered Animations](#staggered-animations)
4. [Animation Orchestration with AnimatePresence](#animation-orchestration-with-animatepresence)
5. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
6. [Advanced Techniques](#advanced-techniques)
7. [Performance Optimization](#performance-optimization)

## Understanding Framer Motion's Core Concepts

Before diving into complex animations, let's review the core concepts of Framer Motion that will help you understand how the library works.

### Motion Components

Framer Motion provides a set of components prefixed with `motion.` that can be animated. For example, `motion.div`, `motion.ul`, and `motion.li`. These components accept special props that control animations:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>
```

### Animation Props

The main animation props are:

- `initial`: The starting state of the animation
- `animate`: The end state of the animation
- `exit`: The state when the component is removed from the DOM
- `transition`: Controls how the animation behaves (duration, easing, etc.)

### Variants

Variants are named animation states that make it easier to orchestrate complex animations:

```jsx
const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

<motion.div variants={variants} initial="hidden" animate="visible" />;
```

### Animation Propagation

This is crucial to understand: When a parent motion component has `initial` and `animate` props, those animation states (if defined as variants) propagate to direct children motion components. However, they don't automatically propagate to deeply nested components.

## Working with Modals

Creating modals with Framer Motion involves several components working together:

1. A backdrop/overlay that covers the screen
2. The modal dialog itself
3. Proper entry and exit animations for both

### Basic Modal Implementation

Here's a basic modal implementation using Framer Motion:

```jsx
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <motion.div
        className="backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
      >
        {title}
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
```

### CSS for Modals

For the modal to work correctly, you need proper CSS:

```css
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal {
  position: relative;
  z-index: 20;
  /* Other modal styles */
}

#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
}

/* Ensure clickable elements inside the modal container */
.backdrop,
.modal {
  pointer-events: auto;
}
```

### Common Modal Issues

1. **Screen remains grayed out after modal closes**: This happens when the backdrop isn't properly removed or animated out. Ensure it has an `exit` animation and is wrapped in `AnimatePresence`.

2. **App becomes unclickable**: This occurs when invisible elements with high z-index values or improper pointer-events settings remain in the DOM. Ensure proper cleanup of all modal elements.

3. **Modal animation works but backdrop doesn't disappear**: Synchronization issue between different animation durations. Make sure all exit animations have appropriate durations and are properly orchestrated.

## Staggered Animations

Staggered animations are perfect for lists where you want items to animate one after another. The key is understanding the parent-child relationship in Framer Motion.

### Basic Staggered List

```jsx
<motion.ul
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 }
      }}
      transition={{ type: "spring" }}
    >
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Important Points for Staggered Animations

1. **Parent must have `initial` and `animate` props**: These are essential for activating the variant system.

2. **Parent must define the `staggerChildren` in its variant**: This controls the delay between each child's animation.

3. **Child variants must match parent variant names**: If the parent uses "hidden" and "visible", the children must also use these exact names.

4. **Empty variant objects are valid**: A parent's variant like `hidden: {}` is valid and necessary even though it doesn't define any animation properties.

## Animation Orchestration with AnimatePresence

`AnimatePresence` is crucial for exit animations. It keeps components in the DOM until their exit animations complete.

### Basic Usage

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Proper Modal Implementation with AnimatePresence

```jsx
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>Modal content</Modal>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Common AnimatePresence Issues

1. **Exit animations not working**: Make sure components have `exit` props and are direct children of `AnimatePresence`.

2. **Multiple elements inside AnimatePresence**: When you have multiple elements that need to animate out, you may need to give them unique keys.

3. **Nested AnimatePresence components**: These can cause unpredictable behavior. Try to keep AnimatePresence as flat as possible in your component hierarchy.

## Common Pitfalls and Solutions

### 1. Missing Initial or Animate Props

**Problem**: Animations don't trigger or staggered animations don't work.

**Solution**: Always include `initial` and `animate` props on parent motion components, especially when using variants and staggered animations.

```jsx
// Incorrect
<motion.ul
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {/* Children */}
</motion.ul>

// Correct
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {/* Children */}
</motion.ul>
```

### 2. Variant Names Don't Match Between Parent and Child

**Problem**: Staggered animations don't work, or children animate all at once.

**Solution**: Ensure variant names match exactly between parent and children.

```jsx
// Incorrect
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  <motion.li
    variants={{
      initial: { opacity: 0 },  // Mismatch in name
      final: { opacity: 1 }     // Mismatch in name
    }}
  />
</motion.ul>

// Correct
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  <motion.li
    variants={{
      hidden: { opacity: 0 },  // Names match parent
      visible: { opacity: 1 }  // Names match parent
    }}
  />
</motion.ul>
```

### 3. Exit Animation Conflicts

**Problem**: Modal closes but backdrop remains or vice versa.

**Solution**: Ensure consistent exit animations and durations across related components.

```jsx
// Backdrop and modal with consistent exit durations
<motion.div
  className="backdrop"
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
/>
<motion.dialog
  exit={{ opacity: 0, y: 30 }}
  transition={{ duration: 0.3 }}
/>
```

### 4. Using Variant Names in Exit Props

**Problem**: Exit animations don't work properly.

**Solution**: While you can use variant names for `initial` and `animate`, it's often better to use explicit animation objects for `exit`.

```jsx
// Might cause issues
<motion.li
  variants={{
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  }}
  initial="hidden"
  animate="visible"
  exit="hidden"  // Using variant name
/>

// More reliable
<motion.li
  variants={{
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  }}
  initial="hidden"
  animate="visible"
  exit={{ opacity: 0, scale: 0 }}  // Explicit values
/>
```

### 5. Z-Index and Pointer-Events Issues

**Problem**: Elements become unclickable or invisible elements block clicks.

**Solution**: Carefully manage z-index hierarchy and pointer-events properties.

```css
/* Modal container */
#modal {
  z-index: 100;
  pointer-events: none; /* Let clicks pass through */
}

/* Backdrop */
.backdrop {
  z-index: 10;
  pointer-events: auto; /* Catch clicks */
}

/* Modal dialog */
.modal {
  z-index: 20;
  pointer-events: auto; /* Catch clicks */
}
```

## Advanced Techniques

### Separating Modal and Backdrop for Better Control

Sometimes it's better to manage modal and backdrop separately for more precise control:

```jsx
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <ModalContent onClose={() => setIsModalOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Coordinating Multiple Animations

When you need to coordinate multiple animations with different timing, you can use the `transition` prop to specify delays:

```jsx
<motion.div
  animate={{
    x: 0,
    opacity: 1
  }}
  transition={{
    x: { duration: 0.5 },
    opacity: { duration: 0.2, delay: 0.3 }
  }}
/>
```

### Using AnimatePresence Modes

The `mode` prop in AnimatePresence can control how entering and exiting animations interact:

```jsx
<AnimatePresence mode="wait">
  {/* Only one child will animate at a time */}
  {content}
</AnimatePresence>
```

- `"sync"` (default): Exiting and entering animations happen simultaneously
- `"wait"`: Wait for exiting animations to complete before starting entering animations
- `"popLayout"`: Similar to "wait" but specifically for layout animations

## Performance Optimization

### 1. Use `layoutId` for Smooth Transitions

When an element moves to a new position in the DOM, use `layoutId` for smooth transitions:

```jsx
<AnimatePresence>
  {items.map((item) => (
    <motion.div key={item.id} layoutId={item.id}>
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

### 2. Avoid Animating Expensive CSS Properties

Properties like `width`, `height`, and `top` can trigger browser layout recalculations. When possible, use `transform` instead:

```jsx
// Less performant
<motion.div animate={{ width: 200, height: 200 }} />

// More performant
<motion.div animate={{ scaleX: 2, scaleY: 2 }} />
```

### 3. Use `whileTap` and `whileHover` for Interaction Animations

These are optimized for responsive user interactions:

```jsx
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>
```

## Conclusion

Framer Motion is a powerful tool for creating sophisticated animations in React applications. By understanding the core concepts of variants, animation propagation, and proper orchestration with AnimatePresence, you can build complex, fluid interfaces that delight users.

The most common issues with Framer Motion often stem from misunderstandings about how animation states propagate between components, or improper management of exit animations. By following the principles outlined in this guide, you can avoid these pitfalls and create animations that work consistently and reliably.

Remember that animation is not just about making things move—it's about enhancing user experience through meaningful motion that guides attention and creates a sense of polish and quality in your application.

## Resources

- [Framer Motion Official Documentation](https://www.framer.com/motion/)
- [Framer Motion API Reference](https://www.framer.com/motion/animation/)
- [AnimatePresence Documentation](https://www.framer.com/motion/animate-presence/)
- [Variants Documentation](https://www.framer.com/motion/variants/)
