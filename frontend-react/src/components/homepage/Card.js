import { Image, CloudinaryContext } from 'cloudinary-react';

const Card = () => {
  return (
    <CloudinaryContext cloud_name="your_cloud_name">
      <div className="card">
        <Image 
          publicId="path/to/your/image" 
          width="300" 
          crop="scale" 
        />
      </div>
    </CloudinaryContext>
  );
} 