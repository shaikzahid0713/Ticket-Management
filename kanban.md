1. Project Breakdown and Wireframing

    Project Components: The main components include the toolbox (or header), the ticket container (for tasks), and pop-ups for detailed task management. A task is often referred to as a "ticket" .
    Wireframing Approach: The project was divided into actionable parts like designing the header (toolbox), creating task tickets, and how a popup would operate for an enhanced user experience【4:4†source】.

2. HTML Structure

    Toolbox/Header: Contains priority color indicators and action buttons for adding and removing tasks .
    Task Tickets: Each ticket includes elements like a priority color indicator, a unique ID, a task description area, and a lock icon to allow or restrict edits .
    Popup Modal: Designed for adding or editing tasks, including a text area and priority color selection.

3. CSS Styling

    Global Styles: Applied a box-sizing: border-box to all elements for consistent box-model calculations and reset margins and paddings for clean design .
    Toolbox Styling: Styled with a dark background color, flex display for layout, and appropriate spacing using margin .
    Task Ticket Styling: Ensured each ticket is prominently displayed with distinct coloring for each section, including the ticket ID highlighted with a yellow background .
    Interactive Elements: Added hover effects for better user interaction experience on buttons .

4. Font Awesome Icon Integration

    Library Inclusion: Utilized the CDN method for bringing in Font Awesome icons for dynamic visual elements, enhancing the project's aesthetic and functional value .
    Icon Usage: Added plus and cross icons for the add and remove buttons respectively, using the fa-solid class prefix .

5. Flexbox Usage

    Layout Versatility: Flexbox was extensively used for layout management, ensuring a neat arrangement that adapts to different screen sizes .
    Main Container: Allowed for wrapping behavior to accommodate multiple tickets without breaking the layout integrity .

Additional Concepts

- CDN and Font Awesome: Explained how CDNs are helpful for serving static resources rapidly and effectively across various locations, reducing server load .




### Issues
<details><summary>CSS Modal Box Not inheriting individual class colors</summary>

```markdown
# CSS Priority Issue with Color Classes

## Problem Description
When applying different classes for `modal-priority-container` with `lightsalmon` as the default color, only the default color is applied to all divs, and the individual color classes are not working.

## HTML Structure
```html
<div class="modal-container">
    <textarea name="modal-ticket-description" id="modal-ticket-description"></textarea>
    <div class="modal-priority-container">
        <div class="color-modal lightpink"></div>
        <div class="color-modal lightgreen"></div>
        <div class="color-modal lightblue"></div>
        <div class="color-modal"></div>
    </div>
</div>
```

## CSS Code
```css
.modal-container {
    height: 18rem;
    width: 40rem;
    display: flex;
}

.modal-container #modal-ticket-description {
    width: 85%;
}

.modal-priority-container {
    background-color: #3d3d3d;
    width: 15%;
}

.lightpink {
    background-color: lightpink;
}

.lightgreen {
    background-color: lightgreen;
}

.lightblue {
    background-color: lightblue;
}

.color-modal {
    height: 2rem;
    width: 5rem;
    background-color: lightsalmon;
}
```

## Issue
The `.color-modal` class is overriding the individual color classes because:
1. It's defined after them in the CSS (later rules override earlier ones with equal specificity)
2. All selectors have the same specificity level

## Solutions

### Solution 1: Reorder CSS Rules
```css
/* Default style first */
.color-modal {
    height: 2rem;
    width: 5rem;
    background-color: lightsalmon;
}

/* Overrides after */
.lightpink {
    background-color: lightpink;
}

.lightgreen {
    background-color: lightgreen;
}

.lightblue {
    background-color: lightblue;
}
```

### Solution 2: Increase Specificity
```css
.color-modal.lightpink {
    background-color: lightpink;
}

.color-modal.lightgreen {
    background-color: lightgreen;
}

.color-modal.lightblue {
    background-color: lightblue;
}
```

### Solution 3: Use !important (not recommended)
```css
.lightpink {
    background-color: lightpink !important;
}
```

## Recommended Approach
Solution 1 (reordering CSS rules) is the cleanest approach as it:
- Maintains proper CSS cascade order
- Avoids unnecessary specificity
- Doesn't use `!important`
```
</details>



<details>
<summary>Why we prefer classes over ids in html</summary>
### **Why Prefer Classes Over IDs in HTML Tags?**  

#### **1. Reusability**  
- **Classes** can be used **multiple times** on a page.  
  ```html
  <div class="button">Click Me</div>
  <div class="button">Another Button</div>
  ```
- **IDs** must be **unique** (only one per page).  
  ```html
  <div id="submit-button">Submit</div>
  <!-- Error if reused -->
  <div id="submit-button">Another Submit</div> ❌
  ```

#### **2. Lower Specificity (Better for CSS Maintenance)**  
- **IDs have high specificity** (100 points), making them harder to override:  
  ```css
  #button { color: red; } /* Hard to override */
  .button { color: blue; } /* Easier to override */
  ```
- **Classes (10 points)** are easier to manage in large stylesheets.

#### **3. JavaScript Flexibility**  
- **`querySelectorAll('.class')`** returns **all matching elements**.  
- **`getElementById('id')`** returns only **one element**, making dynamic updates harder.  
  ```javascript
  // Using classes (multiple elements)
  document.querySelectorAll('.btn').forEach(btn => btn.hide());
  
  // Using IDs (only one element)
  document.getElementById('btn').hide(); // Limited to one
  ```

#### **4. Better for Styling Components**  
- **Components (buttons, cards, modals)** often need **shared styling**, which classes handle better.  
  ```html
  <!-- Good (reusable class) -->
  <button class="btn btn-primary">Save</button>
  <button class="btn btn-danger">Delete</button>
  
  <!-- Bad (IDs force unique styles) -->
  <button id="save-btn">Save</button>
  <button id="delete-btn">Delete</button>
  ```

#### **5. Avoids Conflicts in Large Projects**  
- **IDs can cause clashes** in large apps (e.g., two devs using `#header`).  
- **Classes reduce naming conflicts** (e.g., `.card-header` vs. `.sidebar-header`).

---

### **When to Use IDs?**  
✅ **Single unique elements** (e.g., `#main-nav`, `#page-footer`).  
✅ **JavaScript hooks** (e.g., `document.getElementById('modal')`).  
✅ **Anchor links** (e.g., `<a href="#section2">Jump</a>`).  

---

### **Best Practice**  
✔ **Use classes** for styling and reusable components.  
✔ **Use IDs** sparingly (only for truly unique elements).  
✔ **Avoid styling with IDs** (to keep CSS maintainable).  

#### **Example (Preferred Approach)**  
```html
<!-- Good (classes for styling, ID for JS) -->
<div id="user-profile" class="card profile-card">
  <h2 class="card-title">User Details</h2>
</div>
```

**Conclusion:** Classes promote **reusability, lower specificity, and better scalability**, while IDs should be used **only when uniqueness is required**. 🚀

</details>