import { User, DepartmentSummary } from '../types/user.type';

export const summarizeDepartment = (users: User[]): DepartmentSummary => {
  const departments: { [key: string]: User[] } = {};
  const departmentSummary: DepartmentSummary = {};

  users.forEach((user) => {
    if (departments[user.company.department]) {
      departments[user.company.department].push(user);
    } else {
      departments[user.company.department] = [user];
    }
  });

  Object.keys(departments).forEach((department) => {
    const maxAge: number = Math.max(
      ...departments[department].map((item) => item.age)
    );
    const minAge: number = Math.min(
      ...departments[department].map((item) => item.age)
    );
    const hairColor: { [color: string]: number } = {};
    const addressUser: { [name: string]: string } = {};

    departments[department].forEach((user) => {
      if (hairColor[user.hair.color]) {
        hairColor[user.hair.color] += 1;
      } else {
        hairColor[user.hair.color] = 1;
      }
    });

    departments[department].forEach((user) => {
      addressUser[`${user.firstName}${user.lastName}`] =
        user.address.postalCode;
    });

    departmentSummary[department] = {
      female: departments[department].filter((user) => user.gender === 'female')
        .length,
      male: departments[department].filter((user) => user.gender === 'male')
        .length,
      age: `${minAge} - ${maxAge}`,
      hair: hairColor,
      addressUser,
    };
  });

  return departmentSummary;
};
