import { MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
function StatsCard({
  title,
  value,
  growth,
  icon: Icon,
  color,
}) {
  return (
          <motion.div
  whileHover={{ y: -5 }}
  transition={{ duration: 0.2 }}
  className="
  bg-white/80
  dark:bg-white/5
  backdrop-blur-xl
  rounded-3xl
  p-5
  border
  border-white/20
  dark:border-white/10
  shadow-sm
  hover:shadow-xl
  transition-all
  duration-300
  text-gray-600
">    
        <div className="flex items-start justify-between">
        {/* Left */}
        <div className="flex gap-4">
          {/* Icon */}
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center ${color}`}
          >
            <Icon className="text-white" size={26} />
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-500 text-sm">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {value}
            </h2>
          </div>
        </div>

        <button>
          <MoreHorizontal className="text-gray-400" />
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center gap-2">
        <span className="text-green-500 font-medium">
          ↗ {growth}
        </span>

        <span className="text-gray-400 text-sm">
          from last week
        </span>
      </div>
    </motion.div>
  )
}

export default StatsCard