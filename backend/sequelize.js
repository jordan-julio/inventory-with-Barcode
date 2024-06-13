const Sequelize = require('sequelize');

// Connection details
const hostname = "4et.h.filess.io";
const database = "roughApp_originalas";
const port = "3307";
const username = "roughApp_originalas";
const password = process.env.NEXT_PRIVATE_DB_PASSWORD;

// Create a Sequelize instance with the new connection details
const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  port: port,
  dialect: 'mysql',
  dialectModule: require('mysql2') // Explicitly require 'mysql2'
});

// Define your model
const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  });
// table Categories contains the following columns:
// - id (primary key)
// - categoryName
// - description
// - createdAt
// - updatedAt
const Category = sequelize.define('category', {
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
});


// table Products contains the following columns:
// - id (primary key)
// - category (foreign key)
// - productName
// - price
// - description
// - quantity
// - soldAt
// - createdAt
// - updatedAt
const Product = sequelize.define('product', {
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    soldAt: {
      type: Sequelize.DATE
    }
});

// this table should have the same columns as the Product table but add 1 more column called 'uId' which is a foreign key to the User table
const ProductUsingBarCodeAssignToEachUser = sequelize.define('productOnEachUser', {
    uId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    soldAt: {
      type: Sequelize.DATE
    }
});

// Create the table if it doesn't exist
sequelize.sync({ alter: true });
// Sync your model with the database
//User.sync({force: true}).then(() => {
// console.log('MySQL Connected and User table created');
//}).catch(err => {
//  console.error('Unable to connect to the database:', err);
//});

module.exports = { User, sequelize };