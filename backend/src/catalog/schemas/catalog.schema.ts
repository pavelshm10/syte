import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'catalogs' })
export class Catalog extends Document {
  @Prop({ unique: true, required: true, match: /^[a-zA-Z]+$/ })
  name: string;

  @Prop({ enum: ['fashion', 'home', 'general'], required: true })
  vertical: 'fashion' | 'home' | 'general';

  @Prop({ required: true })
  primary: boolean;

  @Prop({ type: [String], enum: ['en_us', 'en_ca', 'es_es'], required: true })
  locales: string[];

  @Prop({ required: true, default: Date.now })
  indexedAt: Date;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
