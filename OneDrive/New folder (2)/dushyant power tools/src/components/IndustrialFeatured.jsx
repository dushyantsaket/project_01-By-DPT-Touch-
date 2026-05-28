import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Wrench, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const industrialTools = [
  {
    id: 'air-blower',
    name: 'Industrial Air Blower',
    desc: 'High-performance 600W blower for dust extraction.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400',
    color: 'bg-red-600'
  },
  {
    id: 'heat-gun',
    name: 'Heavy Duty Heat Gun',
    desc: '2000W professional hot air gun with variable settings.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400',
    color: 'bg-industrial-dark'
  },
  {
    id: 'welding-machine',
    name: 'IGBT Inverter Welding',
    desc: 'Professional arc welding solution for industrial use.',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400',
    color: 'bg-industrial-red'
  },
  {
    id: 'cordless-drill',
    name: '20V Cordless Brushless Drill',
    desc: 'Maximum freedom with high-torque motor technology.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400',
    color: 'bg-gray-800'
  },

{
  "metadata": {
    "source": "sparepartwala.in",
    "category": "Hammer Machine Spare Parts",
    "total_products": 46,
    "current_page": 4,
    "products_per_page": 46,
    "currency": "INR"
  },
  "products": [
    {
      "id": "10853",
      "name": "Hammer Machine Armature 2-20",
      "description": "Armature for 2-20 hammer machine",
      "price": "₹365.00",
      "original_price": "₹500.00",
      "discount": "27% off",
      "rating": 4.25,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/01-2-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/01-2-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/01-2-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-armature-2-20/"
    },
    {
      "id": "10852",
      "name": "Hammer Machine Armature 2-26",
      "description": "Armature for 2-26 hammer machine",
      "price": "₹399.00",
      "original_price": "₹500.00",
      "discount": "20% off",
      "rating": 5.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/23-2-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/23-2-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/23-2-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-armature-2-26/"
    },
    {
      "id": "27984",
      "name": "Hammer Machine Body 2-20",
      "description": "Body housing for 2-20 hammer machine",
      "price": "₹325.00",
      "original_price": "₹400.00",
      "discount": "19% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250509_105539_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250509_105539_copy_700x800-150x150.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-body-2-20/"
    },
    {
      "id": "27896",
      "name": "Hammer Machine Body 2-26",
      "description": "Body housing for 2-26 hammer machine",
      "price": "₹350.00",
      "original_price": "₹500.00",
      "discount": "30% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250504_140744_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250504_140744_copy_700x800-150x150.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-body-2-26/"
    },
    {
      "id": "10953",
      "name": "Hammer Machine Carbon Brash 2-20",
      "description": "Carbon brush for 2-20 hammer machine",
      "price": "₹15.00",
      "original_price": "₹20.00",
      "discount": "25% off",
      "rating": 5.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/72-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/72-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/72-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-carbon-brash-2-20/"
    },
    {
      "id": "10952",
      "name": "Hammer Machine Carbon Brash 2-26",
      "description": "Carbon brush for 2-26 hammer machine",
      "price": "₹15.00",
      "original_price": "₹20.00",
      "discount": "25% off",
      "rating": 3.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/67-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/67-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/67-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-carbon-brash-2-26/"
    },
    {
      "id": "11099",
      "name": "Hammer Machine Carbon Holder 2-20",
      "description": "Carbon brush holder for 2-20 hammer machine",
      "price": "₹25.00",
      "original_price": "₹50.00",
      "discount": "50% off",
      "rating": 3.67,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_174553_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_174553_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_174553_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-carbon-holder-2-20/"
    },
    {
      "id": "16173",
      "name": "Hammer Machine Carbon Holder 2-26",
      "description": "Carbon brush holder for 2-26 hammer machine",
      "price": "₹170.00",
      "original_price": "₹200.00",
      "discount": "15% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150434_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150434_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150434_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-carbon-holder-2-26/"
    },
    {
      "id": "16204",
      "name": "Hammer Machine Chand Patti 2-26",
      "description": "Chand patti (moon plate) for 2-26 hammer machine",
      "price": "₹20.00",
      "original_price": "₹50.00",
      "discount": "60% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152638_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152638_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152638_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-chand-patti-2-26/"
    },
    {
      "id": "16156",
      "name": "Hammer Machine Connection Wire 2-26",
      "description": "Connection wire for 2-26 hammer machine",
      "price": "₹40.00",
      "original_price": "₹80.00",
      "discount": "50% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151138_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151138_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151138_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-connection-wire-2-26/"
    },
    {
      "id": "16217",
      "name": "Hammer Machine Dumping Set 2-20",
      "description": "Dumping set for 2-20 hammer machine",
      "price": "₹99.00",
      "original_price": "₹150.00",
      "discount": "34% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160602_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160602_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160602_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-dumping-set-2-20/"
    },
    {
      "id": "16220",
      "name": "Hammer Machine Dumping Set 2-26",
      "description": "Dumping set for 2-26 hammer machine",
      "price": "₹110.00",
      "original_price": "₹150.00",
      "discount": "27% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_155643_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_155643_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_155643_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-dumping-set-2-26/"
    },
    {
      "id": "16131",
      "name": "Hammer Machine Field Coil 2-20",
      "description": "Field coil (stator) for 2-20 hammer machine",
      "price": "₹340.00",
      "original_price": "₹500.00",
      "discount": "32% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154758_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154758_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154758_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-field-coil-2-20/"
    },
    {
      "id": "16088",
      "name": "Hammer Machine Field Coil 2-26",
      "description": "Field coil (stator) for 2-26 hammer machine",
      "price": "₹380.00",
      "original_price": "₹600.00",
      "discount": "37% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_123012_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_123012_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_123012_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-field-coil-2-26/"
    },
    {
      "id": "10981",
      "name": "Hammer Machine Field Connector 2-26",
      "description": "Field connector for 2-26 hammer machine",
      "price": "₹40.00",
      "original_price": "₹80.00",
      "discount": "50% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121302_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121302_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121302_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-field-connector-2-26/"
    },
    {
      "id": "16109",
      "name": "Hammer Machine Flange 2-20",
      "description": "Flange for 2-20 hammer machine",
      "price": "₹230.00",
      "original_price": "₹450.00",
      "discount": "49% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122531_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122531_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122531_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-flange-2-20/"
    },
    {
      "id": "16100",
      "name": "Hammer Machine Flange 2-26",
      "description": "Flange for 2-26 hammer machine",
      "price": "₹250.00",
      "original_price": "₹650.00",
      "discount": "62% off",
      "rating": null,
      "availability": "Out of Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122411_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122411_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122411_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-flange-2-26/"
    },
    {
      "id": "11096",
      "name": "Hammer Machine Gear 2-20",
      "description": "Gear for 2-20 hammer machine",
      "price": "₹50.00",
      "original_price": "₹100.00",
      "discount": "50% off",
      "rating": 4.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163720_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163720_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163720_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-gear-2-20/"
    },
    {
      "id": "10977",
      "name": "Hammer Machine Gear 2-26",
      "description": "Gear for 2-26 hammer machine",
      "price": "₹95.00",
      "original_price": "₹200.00",
      "discount": "53% off",
      "rating": 4.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121208_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121208_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121208_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-gear-2-26/"
    },
    {
      "id": "27814",
      "name": "Hammer Machine Head 2-20",
      "description": "Head assembly for 2-20 hammer machine",
      "price": "₹150.00",
      "original_price": "₹200.00",
      "discount": "25% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250427_154915_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250427_154915_copy_700x800-150x150.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-head-2-20/"
    },
    {
      "id": "27904",
      "name": "Hammer Machine Head 2-26",
      "description": "Head assembly for 2-26 hammer machine",
      "price": "₹299.00",
      "original_price": "₹350.00",
      "discount": "15% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250504_135426_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2025/05/20250504_135426_copy_700x800-150x150.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-head-2-26/"
    },
    {
      "id": "10986",
      "name": "Hammer Machine Knob 2-20",
      "description": "Knob for 2-20 hammer machine",
      "price": "₹40.00",
      "original_price": "₹50.00",
      "discount": "20% off",
      "rating": 5.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121534_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121534_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_121534_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-knob-2-20/"
    },
    {
      "id": "10838",
      "name": "Hammer Machine Knob 2-26",
      "description": "Knob for 2-26 hammer machine",
      "price": "₹45.00",
      "original_price": "₹80.00",
      "discount": "44% off",
      "rating": 3.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/114-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/114-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/114-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-knob-2-26/"
    },
    {
      "id": "16168",
      "name": "Hammer Machine Mouth Set 2-20",
      "description": "Mouth set for 2-20 hammer machine",
      "price": "₹70.00",
      "original_price": "₹150.00",
      "discount": "53% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150859_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150859_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_150859_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-mouth-set-2-20/"
    },
    {
      "id": "16200",
      "name": "Hammer Machine Mouth Set 2-26",
      "description": "Mouth set for 2-26 hammer machine",
      "price": "₹82.00",
      "original_price": "₹100.00",
      "discount": "18% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154124_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154124_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154124_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-mouth-set-2-26/"
    },
    {
      "id": "10836",
      "name": "Hammer Machine O Ring 2-20",
      "description": "O-ring for 2-20 hammer machine",
      "price": "₹17.00",
      "original_price": "₹20.00",
      "discount": "15% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/29-2-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/29-2-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/29-2-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-o-ring-2-20/"
    },
    {
      "id": "10837",
      "name": "Hammer Machine O Ring 2-26",
      "description": "O-ring for 2-26 hammer machine",
      "price": "₹20.00",
      "original_price": "₹30.00",
      "discount": "33% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/100-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/100-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/100-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-o-ring-2-26/"
    },
    {
      "id": "11074",
      "name": "Hammer Machine Pendulum 2-20",
      "description": "Pendulum for 2-20 hammer machine",
      "price": "₹150.00",
      "original_price": "₹250.00",
      "discount": "40% off",
      "rating": 3.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163305_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163305_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163305_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-pendulum-2-20/"
    },
    {
      "id": "10835",
      "name": "Hammer Machine Pendulum 2-26",
      "description": "Pendulum for 2-26 hammer machine",
      "price": "₹220.00",
      "original_price": "₹300.00",
      "discount": "27% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/95-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/95-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/95-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-pendulum-2-26/"
    },
    {
      "id": "10824",
      "name": "Hammer Machine Piston 2-20",
      "description": "Piston for 2-20 hammer machine",
      "price": "₹80.00",
      "original_price": "₹150.00",
      "discount": "47% off",
      "rating": 5.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/45-1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/45-1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/45-1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-piston-2-20/"
    },
    {
      "id": "10825",
      "name": "Hammer Machine Piston 2-26",
      "description": "Piston for 2-26 hammer machine",
      "price": "₹90.00",
      "original_price": "₹150.00",
      "discount": "40% off",
      "rating": 3.5,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2022/02/43-2-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/43-2-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2022/02/43-2-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-piston-2-26/"
    },
    {
      "id": "16150",
      "name": "Hammer Machine Piston Pin 2-20",
      "description": "Piston pin for 2-20 hammer machine",
      "price": "₹28.00",
      "original_price": "₹40.00",
      "discount": "30% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152728_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152728_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152728_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-piston-pin-2-20/"
    },
    {
      "id": "17128",
      "name": "Hammer Machine Piston Pin 2-26",
      "description": "Piston pin for 2-26 hammer machine",
      "price": "₹28.00",
      "original_price": "₹60.00",
      "discount": "53% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/02/20240217_145942_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/02/20240217_145942_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/02/20240217_145942_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-piston-pin-2-26/"
    },
    {
      "id": "16161",
      "name": "Hammer Machine SDS Adaptor 2-20",
      "description": "SDS adaptor for 2-20 hammer machine",
      "price": "₹32.00",
      "original_price": "₹50.00",
      "discount": "36% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152903_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152903_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_152903_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-sds-adaptor-2-20/"
    },
    {
      "id": "11090",
      "name": "Hammer Machine Shaft 2-20",
      "description": "Shaft for 2-20 hammer machine",
      "price": "₹70.00",
      "original_price": "₹100.00",
      "discount": "30% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163950_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163950_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163950_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-shaft-2-20/"
    },
    {
      "id": "11093",
      "name": "Hammer Machine Shaft 2-26",
      "description": "Shaft for 2-26 hammer machine",
      "price": "₹90.00",
      "original_price": "₹100.00",
      "discount": "10% off",
      "rating": 3.0,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163822_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163822_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/03/20230301_163822_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-shaft-2-26/"
    },
    {
      "id": "16213",
      "name": "Hammer Machine Striker 2-20",
      "description": "Striker for 2-20 hammer machine",
      "price": "₹70.00",
      "original_price": "₹100.00",
      "discount": "30% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154412_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154412_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_154412_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-striker-2-20/"
    },
    {
      "id": "16158",
      "name": "Hammer Machine Striker 2-26",
      "description": "Striker for 2-26 hammer machine",
      "price": "₹80.00",
      "original_price": "₹99.00",
      "discount": "19% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151028_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151028_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_151028_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-striker-2-26/"
    },
    {
      "id": "16176",
      "name": "Hammer Machine Swing Bearing 2-26",
      "description": "Swing bearing for 2-26 hammer machine",
      "price": "₹60.00",
      "original_price": "₹100.00",
      "discount": "40% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154204_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154204_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_154204_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-swing-bearing-2-26/"
    },
    {
      "id": "10959",
      "name": "Hammer Machine Switch 2-20",
      "description": "Switch for 2-20 hammer machine",
      "price": "₹120.00",
      "original_price": "₹200.00",
      "discount": "40% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122313_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122313_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122313_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-switch-2-20/"
    },
    {
      "id": "10974",
      "name": "Hammer Machine Switch 2-26",
      "description": "Switch for 2-26 hammer machine",
      "price": "₹130.00",
      "original_price": "₹200.00",
      "discount": "35% off",
      "rating": 3.5,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122037_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122037_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_122037_copy_700x800_1-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-switch-2-26/"
    },
    {
      "id": "16207",
      "name": "Hammer Machine Tool Holder 2-20",
      "description": "Tool holder for 2-20 hammer machine",
      "price": "₹370.00",
      "original_price": "₹600.00",
      "discount": "38% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160843_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160843_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240121_160843_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-tool-holder-2-20/"
    },
    {
      "id": "16094",
      "name": "Hammer Machine Tool Holder 2-26",
      "description": "Tool holder for 2-26 hammer machine",
      "price": "₹490.00",
      "original_price": "₹600.00",
      "discount": "18% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122227_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122227_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/01/20240120_122227_copy_700x800-600x600.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-tool-holder-2-26/"
    },
    {
      "id": "21876",
      "name": "Hammer Machine U Clamp 2-26",
      "description": "U-clamp for 2-26 hammer machine",
      "price": "₹38.00",
      "original_price": "₹50.00",
      "discount": "24% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2024/08/20240825_112138_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2024/08/20240825_112138_copy_700x800-150x150.jpg"
      ],
      "category": "Hammer Machine Spare Parts",
      "tags": ["hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/hammer-machine-u-clamp-2-26/"
    },
    {
      "id": "10948",
      "name": "Power Tool Lead",
      "description": "Power tool lead/power cord - compatible with hammer machines",
      "price": "₹90.00",
      "original_price": "₹150.00",
      "discount": "40% off",
      "rating": 4.67,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_111444_copy_700x800_1-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_111444_copy_700x800_1-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/02/20230226_111444_copy_700x800_1-600x600.jpg"
      ],
      "category": [
        "Angle Grinder Spare Parts",
        "Cutter Machine Spare Parts",
        "Demolition Hammer Spare Parts",
        "Drill Machine Spare Parts",
        "Hammer Machine Spare Parts"
      ],
      "tags": ["cutter-machine-spare-parts", "drill-machine-spare-parts", "grinder-machine-spare-part", "hammer-machine-spare-parts"],
      "product_url": "https://sparepartwala.in/product/power-tool-lead/"
    },
    {
      "id": "12697",
      "name": "Power Tools Bearing Puller",
      "description": "Bearing puller tool - compatible with hammer machines for bearing removal",
      "price": "₹599.00",
      "original_price": "₹700.00",
      "discount": "14% off",
      "rating": null,
      "availability": "In Stock",
      "images": [
        "https://sparepartwala.in/wp-content/uploads/2023/06/20230603_181622_copy_700x800-300x300.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/06/20230603_181622_copy_700x800-150x150.jpg",
        "https://sparepartwala.in/wp-content/uploads/2023/06/20230603_181622_copy_700x800-600x600.jpg"
      ],
      "category": [
        "Angle Grinder Spare Parts",
        "Cutter Machine Spare Parts",
        "Drill Machine Spare Parts",
        "Hammer Machine Spare Parts",
        "Tools"
      ],
      "tags": [],
      "product_url": "https://sparepartwala.in/product/power-tools-bearing-puller/"
    }
  ]
}
];

const IndustrialFeatured = () => {
  return (
    <section className="py-24 bg-industrial-dark text-white relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-industrial-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-12 bg-industrial-red"></span>
            <span className="text-industrial-red font-black uppercase tracking-[0.3em] text-xs">Core Implements</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Main Industrial <br /><span className="text-industrial-red">Toolbox</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            From blowers to heavy-duty welding gear, we provide the essential armament for modern industrial infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industrialTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Image Reveal on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <img src={tool.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                <tool.icon size={28} className="text-white" />
              </div>

              <h3 className="text-2xl font-black mb-4 tracking-wide group-hover:text-industrial-red transition-colors capitalize">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {tool.desc}
              </p>

              <Link 
                to="/categories/welding-tools"
                className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] hover:text-industrial-red transition-colors"
              >
                View Collection <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Secondary Services Row */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-industrial-red rounded-[2.5rem] flex-shrink-0 flex items-center justify-center shadow-3xl shadow-industrial-red/20">
                    <Settings size={60} className="text-white animate-spin-slow" />
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Tool Storage & Org</h3>
                   <p className="text-gray-400 font-medium mb-6">Industrial toolboxes, cabinets, and pipe wrenches for organized workshops.</p>
                   <Link to="/categories/tool-storage" className="bg-white text-industrial-dark px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-industrial-red hover:text-white transition-all shadow-xl">Browse Storage</Link>
                </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-industrial-dark border border-white/10 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center shadow-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50" alt="" />
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Agri & Garden Gear</h3>
                   <p className="text-gray-400 font-medium mb-6">Petrol tillers, brush cutters, and sprayers for intensive farming.</p>
                   <Link to="/categories/agriculture-tools" className="bg-industrial-red text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-industrial-dark transition-all shadow-xl">Explore Agriculture</Link>
                </div>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </section>
  );
};

export default IndustrialFeatured;
