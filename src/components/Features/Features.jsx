import React from 'react'
import {Container, FeaturesCard} from '../index.js'
import { features } from '../../utils/constant.js';

const Features = () => {
  return (
    <section className=" py-12 bg-black text-white">
      <Container>
        <div>
          <h3 className="text-4xl font-bold mb-12 text-center">
            Powerful Features
          </h3>
        </div>
        <div className="">
            {features?.map(
                (item, index) =>(
                    <FeaturesCard
                        item={item.step}
                        title={item.title}
                        desc={item.description}
                    />
                ))
            }
        </div>
      </Container>
    </section>
  );
}

export default Features