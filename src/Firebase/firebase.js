import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseconf";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    // auth methods
    this.auth = app.auth();
    this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(
      this
    );
    this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(
      this
    );
    this.doSignOut = this.doSignOut.bind(this);
    // database methods
    this.db = app.firestore();
    this.getPalettes = this.getPalettes.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.saveNewPalette = this.saveNewPalette.bind(this);
    this.saveEditedPalette = this.saveEditedPalette.bind(this);
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordreset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  getPalettes() {
    return this.db.collection("defeaultpalettes").get();
  }

  findPalette(paletteID) {
    return this.db.collection("defeaultpalettes").doc(paletteID).get();
  }

  saveNewPalette(palette) {
    return this.db.collection("defeaultpalettes").add(palette);
  }

  saveEditedPalette(palette, id) {
    return this.db.collection("defeaultpalettes").doc(id).set(palette);
  }
}

export default Firebase;
