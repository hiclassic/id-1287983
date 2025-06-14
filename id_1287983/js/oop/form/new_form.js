class User {
  #id;
  #name;
  #email;
  #phone;
  #password;

  constructor(id, name, email, phone, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  // Setters with validation
  set id(value) {
    if (!value) throw new Error("ID is required.");
    this.#id = value;
  }

  set name(value) {
    if (!value.trim()) throw new Error("Name cannot be empty.");
    this.#name = value.trim();
  }

  set email(value) {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) throw new Error("Invalid email format.");
    this.#email = value;
  }

  set phone(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 10) throw new Error("Phone number must have at least 10 digits.");
    this.#phone = cleaned;
  }

  set password(value) {
    if (value.length < 6) throw new Error("Password must be at least 6 characters.");
    this.#password = value;
  }

  // Getters
  get userData() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      phone: this.#phone,
      password: "********" // Don't expose real password
    };
  }
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();
  try {
    const user = new User(
      document.getElementById('id').value,
      document.getElementById('name').value,
      document.getElementById('email').value,
      document.getElementById('phone').value,
      document.getElementById('password').value
    );

    console.log("User Created:", user.userData);
    alert("User created successfully!");

    // Reset form
    this.reset();
  } catch (err) {
    alert(err.message);
  }
});
