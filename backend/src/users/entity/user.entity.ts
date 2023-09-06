import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Offer } from 'src/offers/entity/offer.entity';
import { Wish } from 'src/wishes/entity/wish.entity';
import { WishList } from 'src/wishlists/entity/wishlist.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @Length(2, 30)
  @IsString()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(1, 200)
  @IsOptional()
  about: string;

  @Column()
  @IsString()
  password?: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => WishList, (wishlist) => wishlist.owner)
  wishlists: WishList[];
}
