window.AppContent = {
  categories: [
    { id: 'all', name: 'Все десерты' },
    { id: 'berry', name: 'Ягодные' },
    { id: 'nut', name: 'Фисташка & Орех' },
    { id: 'chocolate', name: 'Шоколадные' },
    { id: 'zero', name: 'Без сахара' }
  ],
  products: [
    {
      id: 'roll-1',
      title: 'Фисташка & Ягодная Малина',
      category: 'nut',
      price: 1800,
      weight: '85 г',
      calories: '220 ккал',
      badge: 'БЕСТСЕЛЛЕР',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
      description: 'Сливочный бисквит на основе муки из отборной сицилийской фисташки с прослойкой из домашнего кули свежей малины.',
      ingredients: 'Фисташковая мука, сливки 33%, малина, яичный белок, тростниковый сахар, натуральная ваниль.'
    },
    {
      id: 'roll-2',
      title: 'Манго & Тропическая Маракуйя',
      category: 'berry',
      price: 1900,
      weight: '80 г',
      calories: '195 ккал',
      badge: 'НОВИНКА',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
      description: 'Нежнейший рулет с экзотическим кремом из сочной мякоти спелого манго и яркой кислинкой маракуйи.',
      ingredients: 'Пюре манго, маракуйя, натуральные сливки, бисквит, глазурь из белого шоколада.'
    },
    {
      id: 'roll-3',
      title: 'Черный Трюфель & Фундук',
      category: 'chocolate',
      price: 2100,
      weight: '90 г',
      calories: '290 ккал',
      badge: 'ШЕФ-ВЫБОР',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      description: 'Густой ганаш из 70% бельгийского шоколада с обжаренным дробленым фундуком в мягком шоколадном бисквите.',
      ingredients: 'Шоколад Callebaut 70%, обжаренный фундук, какао-порошок, сливки, сливочное масло.'
    },
    {
      id: 'roll-4',
      title: 'Соленая Карамель & Пекан',
      category: 'nut',
      price: 1850,
      weight: '85 г',
      calories: '260 ккал',
      badge: '',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      description: 'Тягучая авторская соленая карамель с гималайской розовой солью и подсушенным орехом пекан.',
      ingredients: 'Карамель, орех пекан, розовая гималайская соль, сливочный сыр mascarpone.'
    },
    {
      id: 'roll-5',
      title: 'Ваниль Бурбон & Клубника',
      category: 'berry',
      price: 1750,
      weight: '80 г',
      calories: '210 ккал',
      badge: 'КЛАССИКА',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      description: 'Натуральная мадагаскарская ваниль Бурбон в воздушном муссе со свежими ягодами садовой клубники.',
      ingredients: 'Ваниль стручковая, клубничный конфитюр, легкий бисквит, сахарная пудра.'
    },
    {
      id: 'roll-6',
      title: 'Черника & Лаванда Zero',
      category: 'zero',
      price: 2000,
      weight: '75 г',
      calories: '140 ккал',
      badge: 'WITHOUT SUGAR',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      description: 'Дикая лесная черника с тонким ароматом прованской лаванды на основе эритритола и миндальной муки.',
      ingredients: 'Миндальная мука, эритритол, черника, цветы лаванды, обезжиренный творожный крем.'
    }
  ]
};