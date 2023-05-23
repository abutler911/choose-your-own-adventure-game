const mongoose = require("mongoose");
const Character = require("./src/models/character.js");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Warrior
    const warrior = new Character({
      name: "Base Warrior",
      class: "Warrior",
      attributes: {
        strength: 70,
        agility: 50,
        stamina: 80,
        mana: 20,
        intelligence: 30,
        wisdom: 30,
        charisma: 40,
        stealth: 30,
        resilience: 80,
        luck: 50,
        perception: 40,
        endurance: 80,
      },
    });

    // Mage
    const mage = new Character({
      name: "Base Mage",
      class: "Mage",
      attributes: {
        strength: 20,
        agility: 40,
        stamina: 30,
        mana: 90,
        intelligence: 80,
        wisdom: 70,
        charisma: 50,
        stealth: 40,
        resilience: 30,
        luck: 50,
        perception: 60,
        endurance: 30,
      },
    });

    // Wizard
    const wizard = new Character({
      name: "Base Wizard",
      class: "Wizard",
      attributes: {
        strength: 20,
        agility: 40,
        stamina: 30,
        mana: 95,
        intelligence: 85,
        wisdom: 75,
        charisma: 40,
        stealth: 30,
        resilience: 20,
        luck: 60,
        perception: 90,
        endurance: 20,
      },
    });

    // Palladin
    const palladin = new Character({
      name: "Base Palladin",
      class: "Palladin",
      attributes: {
        strength: 70,
        agility: 50,
        stamina: 80,
        mana: 30,
        intelligence: 40,
        wisdom: 60,
        charisma: 50,
        stealth: 30,
        resilience: 80,
        luck: 40,
        perception: 40,
        endurance: 90,
      },
    });

    // Rogue
    const rogue = new Character({
      name: "Base Rogue",
      class: "Rogue",
      attributes: {
        strength: 40,
        agility: 90,
        stamina: 60,
        mana: 20,
        intelligence: 50,
        wisdom: 40,
        charisma: 60,
        stealth: 90,
        resilience: 40,
        luck: 70,
        perception: 80,
        endurance: 60,
      },
    });

    // Thief
    const thief = new Character({
      name: "Base Thief",
      class: "Thief",
      attributes: {
        strength: 35,
        agility: 85,
        stamina: 55,
        mana: 15,
        intelligence: 60,
        wisdom: 40,
        charisma: 70,
        stealth: 95,
        resilience: 35,
        luck: 75,
        perception: 85,
        endurance: 55,
      },
    });

    // Assassin
    const assassin = new Character({
      name: "Base Assassin",
      class: "Assassin",
      attributes: {
        strength: 60,
        agility: 85,
        stamina: 60,
        mana: 20,
        intelligence: 60,
        wisdom: 40,
        charisma: 50,
        stealth: 90,
        resilience: 40,
        luck: 70,
        perception: 80,
        endurance: 60,
      },
    });

    // Cleric
    const cleric = new Character({
      name: "Base Cleric",
      class: "Cleric",
      attributes: {
        strength: 30,
        agility: 30,
        stamina: 60,
        mana: 80,
        intelligence: 60,
        wisdom: 80,
        charisma: 70,
        stealth: 30,
        resilience: 70,
        luck: 50,
        perception: 60,
        endurance: 70,
      },
    });

    // Priest
    const priest = new Character({
      name: "Base Priest",
      class: "Priest",
      attributes: {
        strength: 20,
        agility: 20,
        stamina: 40,
        mana: 90,
        intelligence: 60,
        wisdom: 90,
        charisma: 80,
        stealth: 30,
        resilience: 50,
        luck: 60,
        perception: 70,
        endurance: 60,
      },
    });

    // Ranger
    const ranger = new Character({
      name: "Base Ranger",
      class: "Ranger",
      attributes: {
        strength: 50,
        agility: 80,
        stamina: 70,
        mana: 40,
        intelligence: 60,
        wisdom: 60,
        charisma: 40,
        stealth: 70,
        resilience: 60,
        luck: 50,
        perception: 90,
        endurance: 70,
      },
    });

    // Warlock
    const warlock = new Character({
      name: "Base Warlock",
      class: "Warlock",
      attributes: {
        strength: 30,
        agility: 40,
        stamina: 50,
        mana: 90,
        intelligence: 70,
        wisdom: 80,
        charisma: 60,
        stealth: 40,
        resilience: 60,
        luck: 50,
        perception: 70,
        endurance: 60,
      },
    });

    // Necromancer
    const necromancer = new Character({
      name: "Base Necromancer",
      class: "Necromancer",
      attributes: {
        strength: 20,
        agility: 30,
        stamina: 40,
        mana: 90,
        intelligence: 80,
        wisdom: 70,
        charisma: 50,
        stealth: 40,
        resilience: 50,
        luck: 60,
        perception: 60,
        endurance: 50,
      },
    });

    // Alchemist
    const alchemist = new Character({
      name: "Base Alchemist",
      class: "Alchemist",
      attributes: {
        strength: 30,
        agility: 40,
        stamina: 50,
        mana: 80,
        intelligence: 90,
        wisdom: 70,
        charisma: 60,
        stealth: 50,
        resilience: 60,
        luck: 70,
        perception: 80,
        endurance: 60,
      },
    });

    // Artificer
    const artificer = new Character({
      name: "Base Artificer",
      class: "Artificer",
      attributes: {
        strength: 40,
        agility: 50,
        stamina: 60,
        mana: 80,
        intelligence: 90,
        wisdom: 70,
        charisma: 60,
        stealth: 60,
        resilience: 70,
        luck: 60,
        perception: 80,
        endurance: 70,
      },
    });

    // Archer
    const archer = new Character({
      name: "Base Archer",
      class: "Archer",
      attributes: {
        strength: 40,
        agility: 90,
        stamina: 60,
        mana: 20,
        intelligence: 50,
        wisdom: 40,
        charisma: 60,
        stealth: 90,
        resilience: 40,
        luck: 70,
        perception: 80,
        endurance: 60,
      },
    });

    // Bard
    const bard = new Character({
      name: "Base Bard",
      class: "Bard",
      attributes: {
        strength: 30,
        agility: 60,
        stamina: 50,
        mana: 70,
        intelligence: 70,
        wisdom: 70,
        charisma: 90,
        stealth: 70,
        resilience: 40,
        luck: 80,
        perception: 70,
        endurance: 60,
      },
    });

    // Druid
    const druid = new Character({
      name: "Base Druid",
      class: "Druid",
      attributes: {
        strength: 40,
        agility: 60,
        stamina: 70,
        mana: 80,
        intelligence: 60,
        wisdom: 80,
        charisma: 60,
        stealth: 60,
        resilience: 70,
        luck: 60,
        perception: 70,
        endurance: 70,
      },
    });

    // Monk
    const monk = new Character({
      name: "Base Monk",
      class: "Monk",
      attributes: {
        strength: 60,
        agility: 90,
        stamina: 70,
        mana: 50,
        intelligence: 60,
        wisdom: 70,
        charisma: 50,
        stealth: 70,
        resilience: 70,
        luck: 50,
        perception: 80,
        endurance: 80,
      },
    });

    Promise.all([
      warrior.save(),
      mage.save(),
      wizard.save(),
      palladin.save(),
      rogue.save(),
      thief.save(),
      assassin.save(),
      cleric.save(),
      priest.save(),
      ranger.save(),
      warlock.save(),
      necromancer.save(),
      alchemist.save(),
      artificer.save(),
      archer.save(),
      bard.save(),
      druid.save(),
      monk.save(),
    ])
      .then(() => {
        mongoose.connection.close();
        console.log("Character base saved successfully. Connection closed.");
      })
      .catch((error) => {
        console.error("Error saving character base:", error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
