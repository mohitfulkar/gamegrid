import React from 'react';

export default function Disclaimer() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
    <h1 className='text-3xl font-medium text-slate-800'>Disclaimer</h1>
    <div className='bg-slate-900 mt-10 rounded-lg p-5 text-white'>
        <p>GameGrid provided the www.gamegrid.in website as a service to public. 
        The information provided on the website is for general informational purposes only.
        </p>
        <p>
        GameGrid is not responsible for any loss or damage of any kind arising out of use.
         While the information contained within the site is periodically updated, no guarantee is given that the information provided in this web site is correct, complete, and up-to-date. 
         Although the site may include links providing direct access to other internet resources, including web sites, GameGrid is not responsible for the accuracy, adequacy, validity, reliability, availability or completeness of content of information contained in these sites. 
         Links from the website to third-party sites do not constitute an endorsement by GameGrid of the parties or their products and services. The appearance on the Web site of advertisements and product or service information does not constitute an endorsement by GameGrid , and GameGrid has not investigated the claims made by any advertiser. 
         Advertisements and Product information is based solely on the content received from suppliers.
        </p>
    </div>

    <h1 className='text-3xl font-medium mt-5 text-slate-800'>Privacy Policy</h1>
    <div className='bg-slate-900 mt-10 rounded-lg p-5 text-white'>
    <p>
    We may collect information about you in variety of ways. The information we may collect via the application depends on the content and materials you use, and includes:
    </p>
    <h1 className='mt-2 font-bold'>Personal Data</h1>
    <p>
    Demographic and other personally identifiable information (such as your name, contact no and email id) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as application registration, in our forums, liking posts, sending feedback, responding to surveys or emails. 
    If you choose to share data about yourself via your profile or other interactive areas of the Application, please be advised that all data you disclose in these areas is public and your data might accessible to others who accesses the Application.
    </p>
    <h1 className='mt-2 font-bold'>Derivative Data</h1>
    <p>
    Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including liking, re-blogging, or replying to a post, as well as other interactions with the Application and other users via server log files.
    </p>
    <h1 className='mt-2 font-bold'>Financial Data</h1>
    <p>
    Application never stores or maintains any financial information, such as data related to your payment method (e.g. credit card number, card brand, expiration data, Bank details etc.).
     All the financial information is handled by payment gateway providers and we encourage you to review their privacy policy and contact them directly in case of any discrepancy.
    </p>
    </div>
    </div>
  )
}
