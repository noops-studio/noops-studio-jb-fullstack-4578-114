import { 
    AllowNull, 
    BelongsTo, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    HasMany, 
    HasOne, 
    Model, 
    PrimaryKey, 
    Table 
} from "sequelize-typescript";
import User from "./User";
import Comment from "./comment";
import Follow from "./follow";

@Table({
    underscored: true
})
export default class Post extends Model{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string
    
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string
    
    @AllowNull(false)
    @Column(DataType.STRING(40))
    title: string
    
    @AllowNull(false)
    @Column(DataType.TEXT)
    body: string

    @AllowNull(true)
    @Column(DataType.STRING(255))
    imageUrl: string

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Comment)
    comments: Comment[]

    @HasOne(() => Follow, {
        foreignKey: 'followeeId',
        sourceKey: 'userId'
    })
    follow: Follow;


}
