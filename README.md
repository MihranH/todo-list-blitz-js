# todo-list-blitz-js

# Set up

After cloning the project from github: git clone https://github.com/MihranH/todo-list-blitz-js
  # Run
    npm install
    npm run dev

# For Tailwind setup refer to tailwind.config.js

# Structure of the DB models

For creating DB models use ./db/schema.prisma and create new model object, which will then ask the migration name and create the migration for the model.

# App folder

For creating frontend resusable components use /components folder.

For styles use /styles folder but try to use Tailwind classes.

For each logical aspect of the project create new folder like `tasks` and then create components, mutations (to update data), queries (to get data), page (the whole page being rendered under `tasks`) and validation for setting types for the data.

# Linting
  # Run
    npm run fix-lint
    npm run format-prettier
