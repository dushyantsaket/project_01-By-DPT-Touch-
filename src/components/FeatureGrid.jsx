import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Users, Award } from "lucide-react";

const FeatureGrid = ({ features }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                {item.number}
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
