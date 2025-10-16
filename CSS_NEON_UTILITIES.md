# 🎨 BASELY CSS Neon Utilities Reference

Complete guide to all custom neon effects and animations available in your BASELY project.

---

## 🌟 Text Glow Effects

### Single Color Glows

```jsx
// Purple neon glow
<h1 className="neon-glow-purple">BASELY</h1>

// Pink neon glow
<h2 className="neon-glow-pink">Swap Now</h2>

// Cyan neon glow
<h3 className="neon-glow-cyan">Web3 Ready</h3>
```

**Effect:** Adds layered text-shadow with specified color for neon glow effect.

---

### Multi-Color Neon Text

```jsx
// Rainbow neon glow (purple + pink + cyan)
<h1 className="neon-text">BASELY</h1>
```

**Effect:** Combines all three brand colors for a vibrant multi-color glow.

---

## 📦 Box Glow Effects

### Border Glows

```jsx
// Purple box glow
<div className="box-glow-purple">
  Wallet Card
</div>

// Pink box glow
<div className="box-glow-pink">
  Swap Card
</div>

// Cyan box glow
<div className="box-glow-cyan">
  Yield Card
</div>

// Multi-color border glow (pink + cyan)
<div className="glow-border">
  Special Card
</div>
```

**Effect:** Adds glowing box-shadow around elements for card/border effects.

---

## 🎬 Animations

### Breathing Effect

```jsx
// Pulsing glow animation (3s cycle)
<h1 className="animate-breathing">BASELY</h1>
```

**Effect:** Text glow intensity pulses in and out smoothly.
**Duration:** 3 seconds
**Best for:** Hero titles, important headings

---

### Float Animation

```jsx
// Simple float (4s cycle)
<div className="animate-float">₿</div>
<div className="float">Ξ</div>

// Complex float with rotation (6s cycle)
<div className="animate-float-complex">◎</div>
```

**Effect:**
- **Simple:** Smooth up/down movement
- **Complex:** Up/down movement with subtle rotation

**Duration:** 4s (simple), 6s (complex)
**Best for:** Background decorations, crypto icons

---

### Pulse Glow

```jsx
// Pulsing box shadow (2s cycle)
<div className="animate-pulse-glow">
  Click Me
</div>
```

**Effect:** Box-shadow intensity pulses for attention.
**Duration:** 2 seconds
**Best for:** Buttons, important cards, notifications

---

## 🎨 Gradient Backgrounds

### Standard Gradient

```jsx
// Navy to purple gradient (120deg)
<div className="gradient-bg">
  Content here
</div>
```

**Colors:** #0A001A → #1E0142
**Angle:** 120deg

---

### Alternate Gradient

```jsx
// Navy → purple → navy gradient (135deg)
<div className="gradient-bg-alt">
  Content here
</div>
```

**Colors:** #0A001A → #1E0142 → #0A001A
**Angle:** 135deg
**Best for:** Full-page backgrounds, hero sections

---

## 🎯 Common Combinations

### Hero Title

```jsx
<h1 className="text-7xl font-bold bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent animate-breathing">
  BASELY
</h1>
```

**Features:**
- Large text (text-7xl)
- Gradient color (purple → pink → cyan)
- Breathing animation
- Transparent background with gradient clip

---

### Glowing Card

```jsx
<div className="bg-gradient-to-br from-purple/20 to-transparent border border-purple/30 rounded-2xl p-6 hover:border-purple hover:box-glow-purple transition-all duration-300">
  <h2 className="neon-glow-purple">Card Title</h2>
  <p className="text-gray-400">Card content</p>
</div>
```

**Features:**
- Gradient background (subtle purple)
- Border with hover effect
- Box glow on hover
- Smooth transitions

---

### Floating Icon

```jsx
<div className="absolute top-20 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '0s' }}>
  ₿
</div>
```

**Features:**
- Absolute positioning
- Large size
- Low opacity (background element)
- Float animation with custom delay

---

### Interactive Button

```jsx
<button className="px-8 py-4 bg-gradient-to-r from-purple to-pink hover:from-purple/80 hover:to-pink/80 text-white font-bold rounded-xl transition-all transform hover:scale-105 box-glow-purple">
  Launch Dashboard
</button>
```

**Features:**
- Gradient background (purple → pink)
- Hover state with opacity change
- Scale transform on hover
- Box glow effect
- Rounded corners

---

## 🎨 Color Variables

Access brand colors anywhere:

```css
:root {
  --purple: #6C63FF;
  --pink: #FF00A0;
  --cyan: #00FFF0;
  --navy: #0A001A;
}
```

**Usage in custom CSS:**
```css
.my-element {
  color: var(--purple);
  border-color: var(--cyan);
}
```

---

## 🔧 Custom Animation Delays

Add variety to multiple animated elements:

```jsx
// Stagger float animations
<div className="float" style={{ animationDelay: '0s' }}>Icon 1</div>
<div className="float" style={{ animationDelay: '1s' }}>Icon 2</div>
<div className="float" style={{ animationDelay: '2s' }}>Icon 3</div>
```

---

## 📋 Quick Reference Cheat Sheet

| Class | Effect | Duration | Use Case |
|-------|--------|----------|----------|
| `.neon-glow-purple` | Purple text glow | - | Titles, headings |
| `.neon-glow-pink` | Pink text glow | - | Highlights, CTAs |
| `.neon-glow-cyan` | Cyan text glow | - | Success states |
| `.neon-text` | Multi-color glow | - | Hero elements |
| `.box-glow-purple` | Purple border glow | - | Cards, containers |
| `.box-glow-pink` | Pink border glow | - | Interactive elements |
| `.box-glow-cyan` | Cyan border glow | - | Info panels |
| `.glow-border` | Pink+cyan border | - | Special highlights |
| `.animate-breathing` | Pulse glow | 3s | Hero titles |
| `.animate-float` | Simple float | 4s | Icons, decorations |
| `.animate-float-complex` | Float + rotate | 6s | Complex animations |
| `.animate-pulse-glow` | Pulse shadow | 2s | Buttons, alerts |
| `.gradient-bg` | Navy→purple | - | Backgrounds |
| `.gradient-bg-alt` | Navy→purple→navy | - | Hero sections |

---

## 🎨 Example Layouts

### Neon Card Grid

```jsx
<div className="grid grid-cols-3 gap-6">
  <div className="group bg-gradient-to-br from-purple/20 to-transparent border border-purple/30 rounded-2xl p-6 hover:border-purple hover:box-glow-purple transition-all duration-300">
    <h3 className="neon-glow-purple">Feature 1</h3>
  </div>

  <div className="group bg-gradient-to-br from-pink/20 to-transparent border border-pink/30 rounded-2xl p-6 hover:border-pink hover:box-glow-pink transition-all duration-300">
    <h3 className="neon-glow-pink">Feature 2</h3>
  </div>

  <div className="group bg-gradient-to-br from-cyan/20 to-transparent border border-cyan/30 rounded-2xl p-6 hover:border-cyan hover:box-glow-cyan transition-all duration-300">
    <h3 className="neon-glow-cyan">Feature 3</h3>
  </div>
</div>
```

---

### Floating Background Elements

```jsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '0s' }}>₿</div>
  <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>Ξ</div>
  <div className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>◎</div>
</div>
```

---

### Notification Toast

```jsx
<div className="fixed top-8 right-8 bg-gradient-to-r from-purple to-pink px-6 py-4 rounded-lg box-glow-purple animate-pulse">
  <p className="text-white font-semibold">✅ Transaction Complete!</p>
</div>
```

---

## 🎯 Best Practices

### Performance

✅ **Do:**
- Use animations sparingly (2-3 animated elements per view)
- Add `pointer-events-none` to decorative floating elements
- Use `will-change` for frequently animated elements

❌ **Don't:**
- Animate too many elements simultaneously
- Use high opacity on background decorations
- Stack multiple heavy animations

---

### Accessibility

✅ **Do:**
- Ensure text remains readable with glows
- Test in light/dark modes
- Provide non-animated alternatives

❌ **Don't:**
- Use only color to convey information
- Make critical text hard to read
- Overuse flashing/pulsing effects

---

### Visual Hierarchy

**Intensity Levels:**
1. **High:** Hero titles (breathing + gradient + glow)
2. **Medium:** Section headers (single color glow)
3. **Low:** Body text (no glow, standard colors)

**Glow Usage:**
- **Purple:** Primary actions, wallet info
- **Pink:** CTAs, swaps, transactions
- **Cyan:** Success states, highlights
- **Multi-color:** Hero elements only

---

## 🚀 Adding New Effects

To create custom neon effects:

1. **Define in globals.css:**
```css
.neon-glow-custom {
  text-shadow: 0 0 10px rgba(YOUR_COLOR),
               0 0 20px rgba(YOUR_COLOR),
               0 0 30px rgba(YOUR_COLOR);
}
```

2. **Use in components:**
```jsx
<h1 className="neon-glow-custom">My Title</h1>
```

---

## 🎨 Color Opacity Utilities

Tailwind opacity modifiers work with brand colors:

```jsx
// 20% opacity purple
<div className="bg-purple/20">Card</div>

// 50% opacity pink
<div className="border-pink/50">Border</div>

// 10% opacity cyan
<div className="from-cyan/10">Gradient</div>
```

---

## ✨ Ready to Use!

All these utilities are **live and working** in your BASELY project right now!

**Test them at:** http://localhost:3001

**Examples:**
- Landing page: Hero title uses `animate-breathing`
- Dashboard: Cards use `box-glow-purple/pink/cyan`
- Floating icons: Use `animate-float` with delays

Happy designing! 🎨✨
