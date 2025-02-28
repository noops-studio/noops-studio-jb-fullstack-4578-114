import React, { useState, useEffect } from 'react';
import GiftFilter from '../components/gifts/GiftFilter';
import GiftList from '../components/gifts/GiftList';
import targetService from '../../backend/services/targetService';
import giftService from '../../backend/services/giftService';
import { Target } from '../../backend/models/Target';
import { Gift } from '../../backend/models/Gift';
import Loading from '../components/common/Loading';

const GiftsPage: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<number>(0);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const data = await targetService.getTargets();
        setTargets(data);
      } catch (err) {
        setError('Failed to load target categories. Please try again later.');
      }
    };
    fetchTargets();
  }, []);

  useEffect(() => {
    const fetchGifts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await giftService.getGiftsByTarget(selectedTarget);
        setGifts(data);
      } catch (err) {
        setError('Failed to load gifts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, [selectedTarget]);

  const refreshGifts = async () => {
    setLoading(true);
    try {
      const data = await giftService.getGiftsByTarget(selectedTarget);
      setGifts(data);
    } catch (err) {
      setError('Failed to refresh gifts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Browse Our Gifts</h2>
      
      <GiftFilter targets={targets} selectedTarget={selectedTarget} onChange={setSelectedTarget} />
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <Loading />
      ) : (
        <GiftList gifts={gifts} refreshGifts={refreshGifts} />
      )}
    </div>
  );
};

export default GiftsPage;