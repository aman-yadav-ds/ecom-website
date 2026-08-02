"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SolutionItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface AnimatedSolutionsGridProps {
  solutions: SolutionItem[];
}

export function AnimatedSolutionsGrid({ solutions }: AnimatedSolutionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {solutions.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={item.link}
            className="group relative block rounded-3xl glass-card overflow-hidden border border-light-300 shadow-xs hover:shadow-md h-[460px] md:h-[500px] flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent z-10" />
            </div>

            {/* Top Tags */}
            <div className="relative z-20 flex flex-wrap gap-2">
              {item.tags.map((tag, tIndex) => (
                <span
                  key={tIndex}
                  className="px-3 py-1 rounded-full glass-panel text-dark-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Content */}
            <div className="relative z-20 text-white">
              <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest block mb-1">
                {item.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide mb-3 group-hover:text-red-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                {item.description}
              </p>
              <div className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider group-hover:text-brand-red transition-colors">
                <span>Explore Lineup</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
