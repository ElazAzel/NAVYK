export type AppRoute = `/students/${string}` | `/employers/${string}` | `/mentors/${string}` | `/admin/${string}`;

export const isAppRoute = (path: string): path is AppRoute => {
  return path.startsWith('/students/') || 
         path.startsWith('/employers/') || 
         path.startsWith('/mentors/') || 
         path.startsWith('/admin/');
};
