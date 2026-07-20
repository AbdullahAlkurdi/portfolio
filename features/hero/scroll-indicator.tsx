"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollIndicator } from "@/lib/animations/variants";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      variants={scrollIndicator}
      initial="initial"
      animate="animate"
      aria-hidden="true"
    >
      <ChevronDown size={20} className="text-muted-foreground" />
    </motion.div>
  );
}
