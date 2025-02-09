import { 
    AllowNull, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table 
} from "sequelize-typescript";
import User from "./user";

@Table({
    underscored: true
})
export default class Follow extends Model{

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.UUID)
    followerId: string

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.UUID)
    followeeId: string
}
