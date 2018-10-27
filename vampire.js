class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVamps++;
    }

    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal === 0) {
      return true;
    } else if(vampire.numberOfVampiresFromOriginal === 0) {
      return false;
    } else if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else if (this.numberOfVampiresFromOriginal >= vampire.numberOfVampiresFromOriginal) {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === undefined) {
      return null
    } else {
      return name
    }
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let totalDescendents = 0; // 1

    if (this.offspring.length > 0) {
      totalDescendents += (this.offspring.length); // 2
    }

    for (const offsprings of this.offspring) {
      const offspringNum = offsprings.offspring.length; // 3
      totalDescendents += offspringNum;
    }

    return totalDescendents;

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let milVamps = []; // 1

    if (this.yearConverted > 1979) {
      milVamps.push(this); // 2
    }

    for (const offsprings of this.offspring) {
      const allMillennialVampires = offsprings.allMillennialVampires; // 3
      milVamps = milVamps.concat(allMillennialVampires);
    }

    return milVamps;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {

  // }
}

//Original vampire
const original = new Vampire("Original", 800);

// Bart
const bart = new Vampire("Bart", 900);

// Ansel
const ansel = new Vampire("Ansel", 1200);

// Elgort
const elgort = new Vampire("Elgort", 1400);

// Sarah
const sarah = new Vampire("Sarah", 1800);

// Andrew
const andrew = new Vampire("Andrew", 1985);

//------

original.addOffspring(bart)
original.addOffspring(ansel)

ansel.addOffspring(sarah)
ansel.addOffspring(elgort)

ansel.addOffspring(andrew)

//------
module.exports = Vampire;

 console.log(original.vampireWithName(andrew)); // Works!
 console.log(original.totalDescendents); // Works!

 console.log(original.allMillennialVampires); // Works!!

