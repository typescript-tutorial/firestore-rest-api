import {ApplicationContext} from './context';
import {UserController} from './controllers/UserController';
import {SqlUserService} from './services/firebase/FirebaseUserService';

export function createContext(): ApplicationContext {
  const userService = new SqlUserService();
  const userController = new UserController(userService);
  const ctx: ApplicationContext = {userController};
  return ctx;
}
