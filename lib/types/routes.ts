export type AppRoute = `/student/${string}` | `/employer/${string}` | `/university/${string}` | `/mentor/${string}` | `/admin/${string}`;

export const isAppRoute = (path: string): path is AppRoute => {
  return path.startsWith('/student/') ||
         path.startsWith('/employer/') ||
         path.startsWith('/university/') ||
         path.startsWith('/mentor/') ||
         path.startsWith('/admin/');
};