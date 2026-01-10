import { useState } from 'react';
import { ChevronDown, Droplet, Users, Shield, Clock } from 'lucide-react';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = [
    { 
      name: 'Getting Started', 
      icon: Droplet, 
      color: 'red',
      description: 'Basic information about blood donation',
      questions: [
        {
          question: 'What is blood donation?',
          answer: 'Blood donation is a voluntary procedure where you give blood that can be used to help save lives. Your donated blood is tested, processed, and given to patients who need blood transfusions.'
        },
        {
          question: 'How does the platform work?',
          answer: 'Simply register as a donor with your blood type and location. When someone needs blood, they can search for compatible donors in their area. You\'ll be notified of urgent requests that match your blood type.'
        },
        {
          question: 'Is this service free?',
          answer: 'Yes! Our platform is completely free for both donors and recipients. Our mission is to save lives by making blood donation accessible to everyone.'
        },
        {
          question: 'Who can become a blood donor?',
          answer: 'Generally, healthy individuals aged 18-65 years, weighing at least 50kg, with normal blood pressure and hemoglobin levels can donate blood. Specific eligibility criteria may vary by location.'
        },
        {
          question: 'How often can I donate blood?',
          answer: 'Men can donate whole blood every 12 weeks (3 months), and women can donate every 16 weeks (4 months). Always follow medical guidance and ensure you meet all eligibility criteria.'
        }
      ]
    },
    { 
      name: 'Donation Process', 
      icon: Clock, 
      color: 'blue',
      description: 'Step-by-step donation procedure',
      questions: [
        {
          question: 'How long does donation take?',
          answer: 'The entire process takes about 45-60 minutes, including registration, health screening, the actual donation (8-10 minutes), and rest time.'
        },
        {
          question: 'What should I do before donating?',
          answer: 'Get a good night\'s sleep, eat a healthy meal, drink plenty of water, bring a valid ID, and wear comfortable clothing with sleeves that can be rolled up.'
        },
        {
          question: 'What happens during donation?',
          answer: 'First, you\'ll register and have a health screening. Then you\'ll relax in a donation chair while about 470ml of blood is collected. Finally, you\'ll rest and have refreshments.'
        },
        {
          question: 'What should I do after donating?',
          answer: 'Rest for 10-15 minutes and have refreshments. Drink extra fluids for the next 24 hours. Keep the bandage on for a few hours. Avoid heavy lifting or strenuous exercise for 24 hours.'
        },
        {
          question: 'When will I know my blood type?',
          answer: 'Your blood type will be determined during testing and you\'ll receive this information within 1-2 weeks, usually via email or through your donor portal.'
        }
      ]
    },
    { 
      name: 'Finding Donors', 
      icon: Users, 
      color: 'green',
      description: 'How to search and connect with donors',
      questions: [
        {
          question: 'How do I find compatible donors?',
          answer: 'Use our search feature to find donors by blood type and location. You can filter results by distance, availability, and last donation date.'
        },
        {
          question: 'How do I contact a donor?',
          answer: 'Once you find a compatible donor, you can send them a request through our platform. They will receive a notification and can respond directly to you.'
        },
        {
          question: 'What if no donors are available?',
          answer: 'You can create an urgent request that will be sent to all compatible donors in your area. You can also expand your search radius or contact local blood banks.'
        },
        {
          question: 'How do I create an urgent blood request?',
          answer: 'Go to the "Create Request" section, fill in your blood type, location, hospital details, and urgency level. The system will automatically notify compatible donors in your area.'
        },
        {
          question: 'Can I search donors by location?',
          answer: 'Yes, you can search for donors within a specific radius of your location. You can set the distance range from 5km to 50km to find the nearest available donors.'
        }
      ]
    },
    { 
      name: 'Safety & Privacy', 
      icon: Shield, 
      color: 'blue',
      description: 'Security and health information',
      questions: [
        {
          question: 'Is donating blood safe?',
          answer: 'Yes, absolutely! Blood donation is very safe. All equipment is sterile and used only once. You cannot get any infection from donating blood.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data privacy very seriously. Your personal and medical information is encrypted and stored securely. We never share your data with third parties without your consent.'
        },
        {
          question: 'How is donated blood tested?',
          answer: 'All donated blood undergoes rigorous testing for infectious diseases including HIV, hepatitis B & C, syphilis, and other blood-borne pathogens.'
        },
        {
          question: 'What safety measures are in place during donation?',
          answer: 'We use sterile, single-use equipment for all donations. Medical professionals screen all donors, and strict hygiene standards are maintained at all blood collection sites.'
        },
        {
          question: 'Will I get sick after donating blood?',
          answer: 'Most people feel fine after donating. You might feel slightly tired or dizzy, but this usually passes quickly. Drink plenty of fluids and avoid strenuous activity for 24 hours.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
    setOpenQuestion(null); // Reset open question when changing category
  };

  return (
    <div className="py-6 pb-6 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-rose-50">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(254 202 202 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="py-20 text-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
              <Droplet className="text-red-600 fill-red-600" size={16} />
              <span className="text-red-600 font-bold text-sm">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions about blood donation, eligibility, and our platform
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl pb-20">
          {/* FAQ Categories - 4 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {categories.map((category, categoryIndex) => {
              const Icon = category.icon;
              const isActive = activeCategory === categoryIndex;
              const colorClasses = {
                red: 'from-red-500 to-red-600 shadow-red-200',
                blue: 'from-blue-500 to-blue-600 shadow-blue-200',
                green: 'from-green-500 to-green-600 shadow-green-200'
              };

              return (
                <div
                  key={categoryIndex}
                  onClick={() => toggleCategory(categoryIndex)}
                  className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 cursor-pointer ${
                    isActive ? 'border-red-300 shadow-xl scale-105' : 'border-gray-100 hover:border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-linear-to-br ${colorClasses[category.color]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <ChevronDown
                      className={`text-gray-400 transition-transform duration-300 ${
                        isActive ? 'rotate-180 text-red-600' : 'group-hover:text-red-600'
                      }`}
                      size={20}
                    />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    isActive ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="mt-4 w-full h-1 bg-linear-to-r from-red-500 to-rose-500 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expandable Questions Section */}
          {activeCategory !== null && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-linear-to-br ${
                    categories[activeCategory].color === 'red' ? 'from-red-500 to-red-600' :
                    categories[activeCategory].color === 'blue' ? 'from-blue-500 to-blue-600' :
                    categories[activeCategory].color === 'green' ? 'from-green-500 to-green-600' :
                    'from-blue-500 to-blue-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const Icon = categories[activeCategory].icon;
                      return <Icon className="text-white" size={24} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {categories[activeCategory].name}
                    </h2>
                    <p className="text-gray-600">
                      {categories[activeCategory].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {categories[activeCategory].questions.map((faq, questionIndex) => {
                    const questionKey = `${activeCategory}-${questionIndex}`;
                    const isOpen = openQuestion === questionKey;

                    return (
                      <div
                        key={questionIndex}
                        className="border-2 border-gray-100 rounded-xl overflow-hidden hover:border-red-200 transition-all"
                      >
                        <button
                          onClick={() => toggleQuestion(activeCategory, questionIndex)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all"
                        >
                          <span className="text-lg font-bold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`text-red-600 shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            size={24}
                          />
                        </button>
                        
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t-2 border-gray-100">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;