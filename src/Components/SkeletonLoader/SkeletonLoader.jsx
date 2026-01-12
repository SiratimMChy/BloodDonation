const SkeletonLoader = ({ type = 'card', count = 4 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-base-200 border-2 border-base-300 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-base-300 rounded-lg mb-4"></div>
            
            {/* Title skeleton */}
            <div className="h-6 bg-base-300 rounded-lg mb-3 w-3/4"></div>
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-2/3"></div>
            </div>
            
            {/* Meta info skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-base-300 rounded-full"></div>
              <div className="h-4 bg-base-300 rounded w-1/2"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-10 bg-base-300 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-base-200 border-2 border-base-300 rounded-xl p-4 md:p-6 shadow-lg animate-pulse">
            <div className="flex items-start gap-4">
              {/* Avatar skeleton */}
              <div className="w-12 h-12 bg-base-300 rounded-full shrink-0"></div>
              
              <div className="flex-1 space-y-3">
                {/* Title skeleton */}
                <div className="h-5 bg-base-300 rounded w-1/3"></div>
                
                {/* Content skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                </div>
                
                {/* Meta skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-base-300 rounded w-16"></div>
                  <div className="h-3 bg-base-300 rounded w-20"></div>
                  <div className="h-3 bg-base-300 rounded w-12"></div>
                </div>
              </div>
              
              {/* Action button skeleton */}
              <div className="w-20 h-8 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-base-200 border-2 border-base-300 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg animate-pulse">
            {/* Icon skeleton */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-base-300 rounded-lg md:rounded-xl"></div>
              <div className="w-2 h-2 bg-base-300 rounded-full"></div>
            </div>
            
            {/* Number skeleton */}
            <div className="h-8 md:h-10 bg-base-300 rounded mb-2 w-2/3"></div>
            
            {/* Label skeleton */}
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;