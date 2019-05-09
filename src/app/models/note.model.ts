import {Deserializable} from '../services/deserializable.model';

export class Note implements Deserializable {
  id: number;
  title: string;
  description: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
