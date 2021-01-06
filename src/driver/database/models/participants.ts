module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'participants',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { field: 'name', type: DataTypes.STRING },
      phone: { field: 'phone', type: DataTypes.STRING },
      email: { field: 'email', type: DataTypes.STRING },
    },
    {
      tableName: 'participants',
    },
  );

  model.associate = (models) => {
    model.belongsTo(models.events, { foreignKey: 'event_id' });
  };

  return model;
};
