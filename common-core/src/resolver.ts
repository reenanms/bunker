import { InjectionToken, container } from 'tsyringe';

export function resolve<T>(token: InjectionToken<T>) : T {
  return container.resolve<T>(token);
}
