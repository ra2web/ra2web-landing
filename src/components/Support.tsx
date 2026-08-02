"use client";

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import DonorList from './DonorList';

interface CryptoModalProps {
  currency: string;
  address: string;
  onClose: () => void;
}

const CryptoModal = ({ currency, address, onClose }: CryptoModalProps) => {
  const [buttonText, setButtonText] = useState('复制地址');
  const currencyNames: {[key: string]: string} = {
    'btc': '比特币',
    'eth': '以太坊',
    'doge': '狗狗币'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setButtonText('地址已复制！');
    setTimeout(() => {
      setButtonText('复制地址');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full text-center text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-semibold mb-4 text-[#171717]">
          {currencyNames[currency]}地址，请仔细核对
        </div>
        
        <div className="mb-4 flex justify-center">
          <div id="qrcode" className="w-48 h-48 bg-white p-2 border border-[#c5c5c5] flex items-center justify-center">
            {address && <QRCodeSVG value={address} size={176} />}
          </div>
        </div>
        
        <div className="break-all text-sm mb-4 bg-[#f0f0f0] p-3 rounded text-[#1a1a1a] font-mono leading-relaxed border border-[#d0d0d0]">
          {address}
        </div>
        
        <button 
          className="bg-[#ff9408] hover:bg-[#fda93c] text-white font-semibold py-2 px-4 rounded transition-colors"
          onClick={copyToClipboard}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default function Support() {
  const [showModal, setShowModal] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [cryptoAddresses, setCryptoAddresses] = useState<{[key: string]: string}>({
    'btc': '',
    'eth': '',
    'doge': ''
  });
  
  // 从配置文件获取加密货币地址
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/crypto-recipients.json');
        if (!response.ok) {
          throw new Error('Failed to fetch crypto addresses');
        }
        const data = await response.json();
        setCryptoAddresses(data);
      } catch (error) {
        console.error('Error fetching crypto addresses:', error);
        // 设置默认地址
        setCryptoAddresses({
          'btc': 'bc1pyyugs97xvy88n4p4v6ntvkx7ywv7y854l4r9z2rcea3uqwnrlhfs7m7guj',
          'eth': '0x75a8250D4906C891C815b2bB9F43983f8a369845',
          'doge': 'DS7cRojM8KWKG9GgRo2HKUqavvNA5mqJVa'
        });
      }
    };
    
    fetchAddresses();
  }, []);

  const handleCryptoClick = (currency: string) => {
    setCurrentCurrency(currency);
    setShowModal(true);
  };

  return (
    <section 
      id="donate" 
      className="py-16 bg-[#0d2033] text-[#e8f1f8] border-y border-[#18334d]"
    >
      <div className="container mx-auto px-4 max-w-[1100px] text-center">
        <h2 className="text-4xl md:text-[50px] font-normal uppercase font-['Oswald',sans-serif] leading-[60px] text-center mb-8">支持红色井界™</h2>
        <p className="mt-6 mb-4 text-[14px] text-[#b9c7d4] max-w-3xl mx-auto">
          红色井界™ 能够成功运作离不开 ChronoDivide 的可持续发展，基础设施（服务器、带宽）等都需要不菲的费用来维持运转，您如果觉得好玩，还请为 ChronoDivide 捐款！
        </p>
        <p className="mb-8 text-[14px] text-[#b9c7d4] max-w-3xl mx-auto">
          为了满足跨国资金流动需要，确保捐赠可以透明地支持到 ChronoDivide 作者，我们决定采用加密货币的形式，目前支持BTC、ETH、DOGE三种加密货币，以及支持按月订阅（类似于充电）的Buy Me A Coffee，下方的地址直接为 ChronoDivide 作者账户，您可以在区块链上透明地查看到每一笔捐助。如果您不知道如何操作，可以微信关注公众号 王二火大 了解加密货币基础知识，再次感谢您的关注和支持！
        </p>
        <div className="w-64 h-[2px] bg-[#ff9408] mx-auto"></div>
        
        <div className="Supportside pt-[75px] flex flex-wrap justify-center items-center">
          {/* Buy Me A Coffee */}
          <a 
            href="https://www.buymeacoffee.com/chronodivide" 
            target="_blank" 
            rel="nofollow"
            className="inline-block m-2 align-middle"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" 
              alt="Buy Me A Coffee" 
              className="h-[60px] w-[217px]" 
            />
          </a>
          
          {/* Crypto Donation Buttons */}
          <div className="inline-flex items-center m-2 align-middle">
            <button 
              className="donate-crypto mx-2 inline-block"
              onClick={() => handleCryptoClick('btc')}
            >
              <img src="/img/btc.svg" alt="捐赠比特币" title="捐赠比特币" className="h-16 w-16" />
            </button>
            
            <button 
              className="donate-crypto mx-2 inline-block"
              onClick={() => handleCryptoClick('eth')}
            >
              <img src="/img/eth.svg" alt="捐赠以太坊" title="捐赠以太坊" className="h-16 w-16" />
            </button>
            
            <button 
              className="donate-crypto mx-2 inline-block"
              onClick={() => handleCryptoClick('doge')}
            >
              <img src="/img/doge.svg" alt="捐赠狗狗币" title="捐赠狗狗币" className="h-16 w-16" />
            </button>
          </div>
        </div>
        
        {/* Crypto Donation Modal */}
        {showModal && currentCurrency && (
          <CryptoModal 
            currency={currentCurrency} 
            address={cryptoAddresses[currentCurrency]} 
            onClose={() => setShowModal(false)} 
          />
        )}

        <DonorList />
      </div>
    </section>
  );
} 
