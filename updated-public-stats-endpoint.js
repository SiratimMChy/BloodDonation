app.get('/public-stats', async (req, res) => {
  try {
    const totalDonors = await usersCollection.countDocuments({ role: 'donor' });
    const allRequests = await requestsCollection.countDocuments();
    const doneRequests = await requestsCollection.countDocuments({
      donation_status: 'done'
    });
    const totalRequests = await requestsCollection.countDocuments({
      donation_status: { $ne: 'done' }
    });
    const successRate = allRequests > 0
      ? Math.round((doneRequests / allRequests) * 100)
      : 0;

    // Get all requests with their messages for categorization
    const allRequestsWithMessages = await requestsCollection.find({
      donation_status: 'done'
    }, { requestMessage: 1 }).toArray();

    // Categorize requests based on message content
    let emergencyCases = 0;
    let surgeriesEnabled = 0;
    let chronicCare = 0;

    allRequestsWithMessages.forEach(request => {
      const message = (request.requestMessage || '').toLowerCase();
      
      // Emergency keywords
      if (message.includes('emergency') || 
          message.includes('urgent') || 
          message.includes('critical') || 
          message.includes('accident') || 
          message.includes('trauma') ||
          message.includes('immediate') ||
          message.includes('asap')) {
        emergencyCases++;
      }
      // Surgery keywords
      else if (message.includes('surgery') || 
               message.includes('operation') || 
               message.includes('surgical') || 
               message.includes('procedure') || 
               message.includes('transplant') ||
               message.includes('bypass') ||
               message.includes('cardiac') ||
               message.includes('heart surgery')) {
        surgeriesEnabled++;
      }
      // Chronic care keywords
      else if (message.includes('chronic') || 
               message.includes('cancer') || 
               message.includes('chemotherapy') || 
               message.includes('dialysis') || 
               message.includes('thalassemia') || 
               message.includes('anemia') ||
               message.includes('regular treatment') ||
               message.includes('ongoing treatment')) {
        chronicCare++;
      }
      // Default to emergency if no specific category found
      else {
        emergencyCases++;
      }
    });

    const bloodStats = await requestsCollection.aggregate([
      { $match: { donation_status: { $ne: 'done' } } },
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } }
    ]).toArray();

    const bloodTypeCounts = {};
    bloodStats.forEach(item => bloodTypeCounts[item._id] = item.count);

    res.send({ 
      totalDonors, 
      totalRequests, 
      successRate, 
      bloodTypeCounts,
      emergencyCases,
      surgeriesEnabled,
      chronicCare
    });
  } catch (error) {
    res.status(500).send({ message: 'Failed to load stats' });
  }
});