// Color mapping from RGB values to color names
const rgbToColorName = {
    "rgb(255, 182, 193)": "lightpink",
    "rgb(144, 238, 144)": "lightgreen",
    "rgb(173, 216, 230)": "lightblue",
    "rgb(255, 160, 122)": "lightsalmon"
};

// UI Element Constants
const lock = "fa-lock"; // Lock icon class
const unlock = "fa-lock-open"; // Unlock icon class
const addBtn = document.querySelector('.add-action'); // Add ticket button
const removeBtn = document.querySelector('.remove-action'); // Remove ticket button
const modalBox = document.querySelector('.modal-container'); // Ticket creation modal
const priorityColorChangeContainer = document.querySelector(".priority-change-container"); // Priority color change container
const allPriorityChangeContiners = document.querySelectorAll('.priority-color'); // All priority color options
const mainContainer = document.querySelector('main'); // Main container for tickets
const modalPriorityContainer = document.querySelector('.modal-priority-container'); // Modal priority container
const allTicketContainers = document.querySelectorAll('.ticket-container'); // All ticket containers
const allModalPriorityContainers = document.querySelectorAll('.color-modal'); // All modal color options

// Filtering elements
const filterColors = document.querySelectorAll(".color"); // Color filter buttons

// State Variables
let isColorSelected = false; // Flag for color selection in modal
let bgColor = 'lightsalmon'; // Default background color for new tickets
let priorityChangeColor = ""; // Color selected for priority change
let isColorChangeSelected = false; // Flag for priority color change
let removeTaskFlag = false; // Flag for ticket removal mode
let showPriorityChange = false; // Flag to show priority change UI
let currentTicket = null; // Currently selected ticket reference

/**
 * Creates a ticket in localStorage
 * @param {string} ticketID - Unique ID for the ticket
 * @param {string} ticketDescription - Description text for the ticket
 * @param {string} ticketBackgroundColor - Background color for the ticket
 */
function createTicketInLocalStorage(ticketID, ticketDescription, ticketBackgroundColor) {
    let ticketDetails = {
        "ticketDescription": ticketDescription,
        "ticketBackgroundColor": ticketBackgroundColor,
    };
    ticketDetails = JSON.stringify(ticketDetails);
    localStorage.setItem(ticketID, ticketDetails);
}

/**
 * Updates an existing ticket in localStorage
 * @param {string} ticketID - ID of the ticket to update
 * @param {string} ticketDescription - New description text
 * @param {string} ticketBackgroundColor - New background color
 */
function updateTicketInLocalStorage(ticketID, ticketDescription, ticketBackgroundColor) {
    let ticket = JSON.parse(localStorage.getItem(ticketID));
    ticket.ticketDescription = ticketDescription;
    ticket.ticketBackgroundColor = ticketBackgroundColor;

    ticket = JSON.stringify(ticket);
    localStorage.setItem(ticketID, ticket);
}

/**
 * Removes a ticket from localStorage
 * @param {string} ticketID - ID of the ticket to remove
 */
function removeTicketInLocalStorage(ticketID) {
    localStorage.removeItem(ticketID);
}

/**
 * Retrieves all tickets from localStorage and creates DOM elements for them
 */
function getTicketsFromLocalStorage() {
    Object.entries(localStorage).forEach(([key, value]) => {
        value = JSON.parse(value);
        createTicket(key, value.ticketBackgroundColor, value.ticketDescription);
    });
}

// Initialize by loading tickets from localStorage
getTicketsFromLocalStorage();

/**
 * Creates a new ticket DOM element and adds it to the page
 * @param {string} ticketID - Unique ID for the ticket
 * @param {string} ticketBackgroundColor - Background color for the ticket
 * @param {string} ticketDescription - Description text for the ticket
 */
function createTicket(ticketID, ticketBackgroundColor, ticketDescription) {
    // First store in localStorage
    createTicketInLocalStorage(ticketID, ticketDescription, ticketBackgroundColor);
    
    // Convert RGB to color name if needed
    ticketBackgroundColor = rgbToColorName[ticketBackgroundColor] || ticketBackgroundColor;

    // Create ticket DOM element
    const newTicket = document.createElement('div');
    newTicket.classList.add(`ticket-container`);
    newTicket.classList.add(ticketBackgroundColor);
    newTicket.innerHTML = `
        <div class="ticket-id">${ticketID}</div>
        <div class="ticket-description">${ticketDescription}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>`;
    
    // Add to main container and set up event listeners
    mainContainer.appendChild(newTicket);
    colorChangeEventListener(newTicket);
    addLockListener(newTicket);
}

/**
 * Adds lock/unlock functionality to a ticket
 * @param {HTMLElement} ticket - The ticket DOM element
 */
function addLockListener(ticket) {
    const lockBtn = ticket.querySelector('.ticket-lock');
    const lockIcon = ticket.querySelector('.ticket-lock i');
    const descriptionDiv = ticket.querySelector('.ticket-description');
    const oldValue = descriptionDiv.innerHTML;
    let newValue = oldValue;

    let ticketID = ticket.querySelector('.ticket-id').innerHTML;
    const ticketBackgroundColor = window.getComputedStyle(ticket).backgroundColor;

    lockBtn.addEventListener('click', function(event) {
        if (lockIcon.classList.contains(lock)) {
            // Unlock the ticket (make editable)
            lockIcon.classList.replace('fa-lock', 'fa-lock-open');
            descriptionDiv.contentEditable = 'true';
        } else {
            // Lock the ticket (make non-editable)
            lockIcon.classList.replace('fa-lock-open', 'fa-lock');
            descriptionDiv.contentEditable = 'false';

            // Check if description changed and update storage
            newValue = descriptionDiv.innerHTML;
            if (newValue !== oldValue) {
                updateTicketInLocalStorage(ticketID, newValue, ticketBackgroundColor);
            }
        }
    });
}

/**
 * Adds double-click event listener for priority color change
 * @param {HTMLElement} ticket - The ticket DOM element
 */
function colorChangeEventListener(ticket) {
    ticket.addEventListener("dblclick", function(event) {
        if (event.target.classList.contains("ticket-lock")) return;
        priorityColorChangeContainer.classList.remove("hide");
        currentTicket = ticket;
    });
}

// Event listener for priority color change selection
priorityColorChangeContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('priority-color')) {
        // Get selected color and update ticket
        priorityChangeColor = window.getComputedStyle(event.target).backgroundColor;
        let ticketID = currentTicket.querySelector('.ticket-id').innerHTML;
        let ticketDescription = currentTicket.querySelector('.ticket-description').innerHTML;

        // Update storage and UI
        updateTicketInLocalStorage(ticketID, ticketDescription, priorityChangeColor);
        priorityChangeColor = rgbToColorName[priorityChangeColor];
        priorityColorChangeContainer.classList.add("hide");

        if (currentTicket) {
            // Update ticket color classes
            currentTicket.classList = "";
            currentTicket.classList.add("ticket-container");
            currentTicket.classList.add(priorityChangeColor);
        }
    }
});

// Toggle ticket creation modal
addBtn.addEventListener('click', function(event) {
    modalBox.classList.toggle('hide');
});

// Handle priority color selection in modal
modalPriorityContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('color-modal')) {
        // Update active state of color options
        allModalPriorityContainers.forEach((priorityContainer) => {
            priorityContainer.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Store selected color
        bgColor = window.getComputedStyle(event.target).backgroundColor;
        isColorSelected = true;
    }
});

// Handle ticket creation on Enter key in modal
modalBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (isColorSelected) {
            // Create new ticket with random ID
            const ticketID = Math.random().toString(36).substring(2);
            const ticketDescription = event.target.value;
            createTicket(ticketID, bgColor, ticketDescription);
            
            // Reset modal
            modalBox.classList.add('hide');
            event.target.value = "";
        } else {
            alert('Priority Color is not selected');
        }
    }
});

// Toggle ticket removal mode
removeBtn.addEventListener('click', function(event) {
    removeTaskFlag = !removeTaskFlag;
    if (removeTaskFlag) {
        alert("Ticket Removal Action Activated");
        removeBtn.style.color = 'red';
    } else {
        alert("Ticket Removal Action Dectivated");
        event.target.style.color = "white";
    }
});

// Handle ticket interactions in main container
mainContainer.addEventListener('click', function(event) {
    // Handle ticket removal
    if (event.target.classList.contains('ticket-container')) {
        if (removeTaskFlag) {
            const ticketID = event.target.querySelector('.ticket-id').innerHTML;
            removeTicketInLocalStorage(ticketID);
            event.target.remove();
        }
    }

    // Handle lock toggle from main container
    if (event.target.classList.contains('ticket-lock')) {
        const descriptionDiv = mainContainer.querySelector('.ticket-description');
        if (event.target.classList.contains(lock)) {
            event.target.classList.remove(lock);
            event.target.classList.add(unlock);
            descriptionDiv.setAttribute("contenteditable", "true");
        } else {
            event.target.classList.remove(unlock);
            event.target.classList.add(lock);
            descriptionDiv.setAttribute("contenteditable", "false");
        }
    }
});

// Add filter functionality for ticket colors
filterColors.forEach((filterColor) => {
    filterColor.addEventListener('click', function(event) {
        const currentColor = filterColor.classList[1];
        const allTicketContainers = document.querySelectorAll('.ticket-container');
        
        allTicketContainers.forEach((ticket) => {
            if (currentColor === undefined) {
                // Show all tickets if no color filter
                ticket.classList.remove('hide');
            } else {
                // Show/hide based on color filter
                ticket.classList.toggle('hide', !ticket.classList.contains(currentColor));
            }
        });
    });
});