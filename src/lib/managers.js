class TripManager {
  constructor() {
    this.trips = JSON.parse(localStorage.getItem('trips')) || [];
  }

  addTrip(trip) {
    trip.id = Date.now();
    this.trips.push(trip);
    this.save();
    return trip;
  }

  getTrips() {
    return this.trips;
  }

  getTrip(id) {
    return this.trips.find(trip => trip.id === parseInt(id));
  }

  updateTrip(id, updatedTrip) {
    const index = this.trips.findIndex(trip => trip.id === parseInt(id));
    if (index !== -1) {
      this.trips[index] = { ...this.trips[index], ...updatedTrip };
      this.save();
    }
  }

  deleteTrip(id) {
    this.trips = this.trips.filter(trip => trip.id !== parseInt(id));
    this.save();
  }

  save() {
    localStorage.setItem('trips', JSON.stringify(this.trips));
  }
}

class UserManager {
  constructor() {
    this.currentUser = null;
    this.users = [];
    this.loadCurrentUser();
    this.loadUsers();
    this.removeLegacySeedUser();
  }

  loadUsers() {
    try {
      const parsedUsers = JSON.parse(localStorage.getItem('users'));
      this.users = Array.isArray(parsedUsers) ? parsedUsers : [];
    } catch (e) {
      this.users = [];
    }
  }

  loadCurrentUser() {
    try {
      const parsedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.currentUser = parsedUser && typeof parsedUser === 'object' ? parsedUser : null;
      // Clear any legacy persisted login so closing the browser always logs out.
      localStorage.removeItem('currentUser');
    } catch (e) {
      this.currentUser = null;
    }
  }

  removeLegacySeedUser() {
    const originalCount = this.users.length;
    this.users = this.users.filter(
      user =>
        !(
          user &&
          user.id === 1 &&
          user.name === 'John Doe' &&
          user.email === 'john@example.com' &&
          user.password === 'Password123'
        )
    );

    if (this.users.length !== originalCount) {
      this.saveUsers();
    }
  }

  normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  sanitizeText(value) {
    return String(value || '').trim();
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  validateName(name) {
    return name.length >= 2;
  }

  getPublicUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  login(email, password) {
    const safeEmail = this.normalizeEmail(email);
    const safePassword = String(password || '');

    if (!this.validateEmail(safeEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (!safePassword) {
      return { ok: false, error: 'Password is required.' };
    }

    this.loadUsers();
    const existingUser = this.users.find(user => this.normalizeEmail(user.email) === safeEmail);
    if (!existingUser || existingUser.password !== safePassword) {
      return { ok: false, error: 'Invalid email or password.' };
    }

    const user = this.getPublicUser(existingUser);
    this.currentUser = user;
    this.save();
    return { ok: true, user };
  }

  signup({ name, email, password, confirmPassword }) {
    const safeName = this.sanitizeText(name);
    const safeEmail = this.normalizeEmail(email);
    const safePassword = String(password || '');
    const safeConfirmPassword = String(confirmPassword || '');

    if (!this.validateName(safeName)) {
      return { ok: false, error: 'Full name must be at least 2 characters.' };
    }
    if (!this.validateEmail(safeEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (!this.validatePassword(safePassword)) {
      return {
        ok: false,
        error: 'Password must be 8+ chars with uppercase, lowercase, and number.'
      };
    }
    if (safePassword !== safeConfirmPassword) {
      return { ok: false, error: 'Passwords do not match.' };
    }
    this.loadUsers();
    if (this.users.some(user => this.normalizeEmail(user.email) === safeEmail)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now(),
      name: safeName,
      email: safeEmail,
      password: safePassword,
      phone: '+1 (555) 123-4567',
      country: 'United States',
      profilePic: 'https://via.placeholder.com/150'
    };
    this.users.push(newUser);
    this.saveUsers();

    const safeUser = this.getPublicUser(newUser);
    this.currentUser = safeUser;
    this.save();
    return { ok: true, user: safeUser };
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  updateProfile(updates) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      const userIndex = this.users.findIndex(user => user.id === this.currentUser.id);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        this.saveUsers();
      }
      this.save();
    }
  }

  save() {
    if (this.currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}

class WishlistManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
  }

  normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  addItem(item) {
    const normalizedName = this.normalize(item.name);
    const normalizedType = this.normalize(item.type);
    const alreadyExists = this.items.some(
      existing =>
        this.normalize(existing.name) === normalizedName &&
        this.normalize(existing.type) === normalizedType
    );

    if (!alreadyExists) {
      this.items.push({ ...item, id: item.id || Date.now() });
      this.save();
      return true;
    }
    return false;
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
  }

  getItems() {
    return this.items;
  }

  save() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }
}

class BookingManager {
  constructor() {
    this.bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    this.pendingBooking = JSON.parse(localStorage.getItem('pendingBooking')) || null;
  }

  createPendingBooking(bookingData) {
    const pending = {
      id: `BK${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment',
      ...bookingData
    };
    this.pendingBooking = pending;
    localStorage.setItem('pendingBooking', JSON.stringify(pending));
    return pending;
  }

  getPendingBooking() {
    return this.pendingBooking;
  }

  clearPendingBooking() {
    this.pendingBooking = null;
    localStorage.removeItem('pendingBooking');
  }

  confirmPendingBooking(paymentMethod) {
    if (!this.pendingBooking) return null;

    const confirmed = {
      ...this.pendingBooking,
      status: 'Confirmed',
      paymentMethod,
      paidAt: new Date().toISOString(),
      paymentId: `PAY${Date.now()}`
    };

    this.bookings.unshift(confirmed);
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
    this.clearPendingBooking();
    return confirmed;
  }

  getBookings() {
    return this.bookings;
  }
}

export const tripManager = new TripManager();
export const userManager = new UserManager();
export const wishlistManager = new WishlistManager();
export const bookingManager = new BookingManager();

