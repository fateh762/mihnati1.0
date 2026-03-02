import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };

export default function StarRating({ value, onChange, size = 'md', readonly = false }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <motion.button
          key={star}
          type="button"
          whileScale={!readonly ? { scale: 1.2 } : undefined}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={readonly}
        >
          <Star
            className={`${sizes[size]} transition-colors ${
              star <= (hovered || value)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-600'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}
