import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Category from '../models/category.model';
import SubCategory from '../models/subCategory.model';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@pets.nzmgh.mongodb.net/shop` ||
        ''
    );

    // clear existing categories and subcategories
    await Category.deleteMany();
    await SubCategory.deleteMany();

    const categories = await Category.create([
      {
        name_ka: 'კატა',
        name_en: 'Cat',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000307/cat_k6lsxg.jpg'
      },
      {
        name_ka: 'ძაღლი',
        name_en: 'Dog',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000307/dog_ngccuv.jpg'
      },
      {
        name_ka: 'პატარა შინაური ცხოველი',
        name_en: 'Small Pet',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000559/small-pet_ufrnp3.jpg'
      },
      {
        name_ka: 'თევზი',
        name_en: 'Fish',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000307/fish_zdbtuf.jpg'
      },
      {
        name_ka: 'ფრინველი',
        name_en: 'Bird',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000307/bird_htvigb.jpg'
      },
      {
        name_ka: 'რეპტილია',
        name_en: 'Reptile',
        image:
          'https://res.cloudinary.com/dmz0ojzlz/image/upload/v1750000307/reptile_a3lwrm.jpg'
      }
    ]);

    await SubCategory.create([
      // cats
      {
        name_ka: 'კატის მშრალი საკვები',
        name_en: 'Dry Cat Food',
        categoryId: categories[0]._id
      },
      {
        name_ka: 'კატის სველი საკვები',
        name_en: 'Wet Cat Food',
        categoryId: categories[0]._id
      },
      {
        name_ka: 'კატის სათამაშოები',
        name_en: 'Cat Toys',
        categoryId: categories[0]._id
      },
      {
        name_ka: 'კატის მოვლის საშუალებები',
        name_en: 'Cat Care & Grooming',
        categoryId: categories[0]._id
      },
      {
        name_ka: 'კატის ხეები',
        name_en: 'Cat Trees',
        categoryId: categories[0]._id
      },

      // dogs
      {
        name_ka: 'ძაღლის მშრალი საკვები',
        name_en: 'Dry Dog Food',
        categoryId: categories[1]._id
      },
      {
        name_ka: 'ძაღლის სველი საკვები',
        name_en: 'Wet Dog Food',
        categoryId: categories[1]._id
      },
      {
        name_ka: 'ძაღლის სათამაშოები',
        name_en: 'Dog Toys',
        categoryId: categories[1]._id
      },
      {
        name_ka: 'ძაღლის მოვლის საშუალებები',
        name_en: 'Dog Care & Grooming',
        categoryId: categories[1]._id
      },
      {
        name_ka: 'ძაღლის ტანსაცმელი',
        name_en: 'Dog Clothing',
        categoryId: categories[1]._id
      },
      {
        name_ka: 'ძაღლის სასუსნავები და ძვლები',
        name_en: 'Dog Treats & Bones',
        categoryId: categories[1]._id
      },

      // small pets
      {
        name_ka: 'პატარა შინაური ცხოველების გალიები',
        name_en: 'Small Pet Cages',
        categoryId: categories[2]._id
      },
      {
        name_ka: 'პატარა შინაური ცხოველების საკვები',
        name_en: 'Small Pet Food',
        categoryId: categories[2]._id
      },
      {
        name_ka: 'პატარა შინაური ცხოველების სათამაშოები',
        name_en: 'Small Pet Toys',
        categoryId: categories[2]._id
      },
      {
        name_ka: 'პატარა შინაური ცხოველების მოვლის საშუალებები',
        name_en: 'Small Pet Care & Grooming',
        categoryId: categories[2]._id
      },

      // fish
      {
        name_ka: 'თევზის აკვარიუმები',
        name_en: 'Fish Aquariums',
        categoryId: categories[3]._id
      },
      {
        name_ka: 'თევზის საკვები',
        name_en: 'Fish Food',
        categoryId: categories[3]._id
      },

      // birds
      {
        name_ka: 'ფრინველების გალიები',
        name_en: 'Bird Cages',
        categoryId: categories[4]._id
      },
      {
        name_ka: 'ფრინველების საკვები',
        name_en: 'Bird Food',
        categoryId: categories[4]._id
      },
      {
        name_ka: 'ფრინველების სათამაშოები',
        name_en: 'Bird Toys',
        categoryId: categories[4]._id
      },

      // reptiles
      {
        name_ka: 'რეპტილიების გალიები',
        name_en: 'Reptile Cages',
        categoryId: categories[5]._id
      },
      {
        name_ka: 'რეპტილიების საკვები',
        name_en: 'Reptile Food',
        categoryId: categories[5]._id
      }
    ]);

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
