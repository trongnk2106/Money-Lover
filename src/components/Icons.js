export const Icons = {
    Rent: 'https://img.icons8.com/fluency/512/home-page.png',
    Travel: 'https://img.icons8.com/external-flaticons-flat-flat-icons/2x/external-vehicles-automotive-dealership-flaticons-flat-flat-icons-5.png',
    Food: 'https://img.icons8.com/plasticine/2x/food.png',
    Bill: 'https://img.icons8.com/fluency/512/paid-bill.png',
    Medical: 'https://img.icons8.com/fluency/2x/hospital.png',
    Education: 'https://img.icons8.com/fluency/2x/graduation-cap.png',
    Grocery: 'https://img.icons8.com/fluency/512/ingredients.png',
    Entertainment: 'https://img.icons8.com/fluency/2x/ps-controller.png',
    Shopping: 'https://img.icons8.com/fluency/2x/add-shopping-cart.png',
    Salary: 'https://img.icons8.com/fluency/2x/money.png',
    Other_Income: 'https://img.icons8.com/fluency/2x/growing-money.png'
}

export function getIcon(name) {
    switch(name) {
        case 'Rent':
        return Icons.Rent;
        case 'Travel':
        return Icons.Travel;
        case 'Food':
        return Icons.Food;
        case 'Bill':
        return Icons.Bill;
        case 'Medical':
        return Icons.Medical;
        case 'Education':
        return Icons.Education;
        case 'Grocery':
        return Icons.Grocery;
        case 'Entertainment':
        return Icons.RenEntertainmentt;
        case 'Shopping':
        return Icons.Shopping;
        case 'Salary':
        return Icons.Salary;
        case 'Other Income':
        return Icons.Other_Income;
    }
}