import {DataTypes , Model , Optional} from "sequelize";
import  sequelize  from '../../config/db.postgres.js';

interface CategoryAttributes {
    id : string ;
    name : string ;
    slug : string ;
    image : string | null ;
    isActive : boolean ;
    depth : number ;
    parentId : string | null ;
    createdAt? : Date ;
    updatedAt? : Date ;
}


interface CategoryCreationAttributes extends Optional<CategoryAttributes , "id" | "image" | "isActive" | "depth" | "parentId"> {}

class Category 
extends Model<CategoryAttributes , CategoryCreationAttributes>
implements CategoryAttributes 
{
  declare id: string;
  declare name: string;
  declare slug: string;
  declare image: string | null;
  declare parentId: string | null;
  declare depth: number;
  declare isActive: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init({
    id :{
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    slug : {
        type : DataTypes.STRING(120),
        allowNull : false, 
        unique : true 
    },
    image : {
        type : DataTypes.STRING ,
        allowNull : true ,
        defaultValue : null
    },
    parentId : {
        type : DataTypes.UUID ,
        allowNull : true ,
        references: {
        model: 'categories',
        key: 'id',
      },
    },
    depth: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    },
    isActive : {
        type : DataTypes.BOOLEAN ,
        defaultValue : true ,
        allowNull : false
    }
},
{
    sequelize,
    tableName: 'categories',
    underscored: true,
    timestamps: true,
}
)

Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });
Category.hasMany(Category, { foreignKey: 'parentId', as: 'children' });

export default Category ;
                 