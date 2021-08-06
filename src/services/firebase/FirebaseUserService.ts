import {firebase} from '../../config';
import {User} from '../../models/User';

const db = firebase.firestore();

export class SqlUserService {
  constructor() {
  }
  all(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      const users: User[] = [];
      db.collection('users').get()
      .then(results => {
        results.forEach(doc => {
          const id = doc.id;
          const {username, email, phone, dateOfBirth} = doc.data();
          users.push({id, username, email, phone, dateOfBirth});
        });
        resolve(users);
      })
      .catch(err => reject(err));
      });
  }
  load(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      db.collection('users').doc(id).get()
      .then(result => {
        const id = result.id;
        if(!result.data()){
          resolve(result.data() as any);
        }
        else{
          resolve({id ,...result.data()} as any);
        }
      })
      .catch(err => reject(err));
    });
  }
  insert(user: User): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const {id, username, email, phone, dateOfBirth} = user;
      db.collection('users').doc(id).get()
      .then(result => {
        if(result.data()){
          resolve(0);
        }
        else{
          db.collection('users').doc(id).set({username, email, phone, dateOfBirth})
          .then(() => resolve(1))
          .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
    });
  }
  update(user: User): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const {id, username, email, phone, dateOfBirth} = user;
      const body = {username, email, phone, dateOfBirth};
      db.collection('users').doc(id).get()
      .then(result => {
        if(!result.data()){
          resolve(0);
        }
        else{
          db.collection('users').doc(id).set(body, {merge: true})
          .then(() => resolve(1))
          .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
    });
  }
  delete(id: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.collection('users').doc(id).get()
      .then(result => {
        if(!result.data()){
          resolve(0);
        }
        db.collection('users').doc(id).delete()
        .then(() =>resolve(1))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }
}
