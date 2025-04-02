"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios.get('https://dummyjson.com/users');
        const summarizeDepartment = (users) => {
            const departments = {};
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
                departments[department] = {
                    female: departments[department].filter((user) => user.gender === 'female').length,
                    male: departments[department].filter((user) => user.gender === 'male')
                        .length,
                    age: `${minAge} - ${maxAge}`,
                    hair: hairColor,
                    addressUser,
                };
            });
            return departments;
        };
        res.status(200).json({
            message: summarizeDepartment(data.users),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}));
