"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeDepartment = void 0;
const summarizeDepartment = (users) => {
    const departments = {};
    const departmentSummary = {};
    users.forEach((user) => {
        if (departments[user.company.department]) {
            departments[user.company.department].push(user);
        }
        else {
            departments[user.company.department] = [user];
        }
    });
    Object.keys(departments).forEach((department) => {
        const maxAge = Math.max(...departments[department].map((item) => item.age));
        const minAge = Math.min(...departments[department].map((item) => item.age));
        const hairColor = {};
        const addressUser = {};
        departments[department].forEach((user) => {
            if (hairColor[user.hair.color]) {
                hairColor[user.hair.color] += 1;
            }
            else {
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
exports.summarizeDepartment = summarizeDepartment;
