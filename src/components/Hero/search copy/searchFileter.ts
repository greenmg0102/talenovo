import React, { useState } from 'react';

// Dummy data for demonstration purposes
const skillData = [
  { name: 'Python', count: 17152 },
  { name: 'AWS', count: 11411 },
  // Add more skills as needed
];

const locationData = [
  { name: 'US', count: 12603 },
  { name: 'Remote', count: 9001 },
  // Add more locations as needed
];

const SearchFilters = () => {
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [experienceSearchTerm, setExperienceSearchTerm] = useState('');
  const [hideKeyword, setHideKeyword] = useState('');

  const filteredSkills = skillSearchTerm
    ? skillData.filter((skill) =>
        skill.name.toLowerCase().includes(skillSearchTerm.toLowerCase())
      )
    : skillData;

  const filteredLocations = locationSearchTerm
    ? locationData.filter((location) =>
        location.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
      )
    : locationData;

  // Function to handle skill search input changes
  const handleSkillSearchChange = (e) => {
    setSkillSearchTerm(e.target.value);
  };

  // Function to handle location search input changes
  const handleLocationSearchChange = (e) => {
    setLocationSearchTerm(e.target.value);
  };

  // Function to handle experience search input changes
  const handleExperienceSearchChange = (e) => {
    setExperienceSearchTerm(e.target.value);
  };

  // Function to handle hide keyword input changes
  const handleHideKeywordChange = (e) => {
    setHideKeyword(e.target.value);
  };

 

  
};
    
export default SearchFilters;
    
