module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'events',
    {
      id: {
        field: 'id', type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
      },
      title: { field: 'title', type: DataTypes.STRING },
      description: { field: 'description', type: DataTypes.STRING },
      date: { field: 'date', type: DataTypes.DATE },
      status: { field: 'status', type: DataTypes.STRING },
      location: { field: 'location', type: DataTypes.STRING },
      image: { field: 'image', type: DataTypes.STRING },
      createdAt: { field: 'created_at', type: DataTypes.DATE },
      updated_at: { field: 'updated_at', type: DataTypes.DATE },
      deletedAt: { field: 'deleted_at', type: DataTypes.DATE },
      uuid: { field: 'uuid', types: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    },
    {
      tableName: 'events',
    },
  );

  return model;
};
