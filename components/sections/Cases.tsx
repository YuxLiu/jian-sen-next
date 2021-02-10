import React, { useState } from "react";
import {
  CarouselIndicator,
  CarouselIndicatorGroup,
} from "../atomic/CarouselIndicator";
import { CarouselButton } from "../atomic/buttons/CarouselButton";
import { defaultCases } from "../data/default-data";
import { circulateIndex } from "../data/utils";

interface CaseProps {
  image: string;
  title: string;
  text: string;
}

interface Props {
  cases?: CaseProps[];
}

const defaultProps: Props = {
  cases: defaultCases,
};

export function Cases(props: Props) {
  const [cur, setCur] = useState(0);

  const ci = circulateIndex(props.cases.length);
  const at = (i) => props.cases[ci(i)];

  const renderIndicators = props.cases.map((_, i) => (
    <button onClick={() => setCur(i)} key={i} className="mr-2 lg:mr-4">
      <CarouselIndicator active={i === cur} />
    </button>
  ));

  return (
    <div className="relative py-6 md:py-10">
      {/* content */}
      <div className="container mx-auto w-4/5 lg:w-full md:grid md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 px-4">
        {/* current image */}
        <div className="relative md:col-start-2">
          <div className="relative pb-4/5 lg:pb-13/10">
            <img
              src={at(cur).image}
              alt="i"
              className="rounded-3xl img-ratio"
            />
            <CarouselButton
              onClick={() => setCur(ci(cur - 1))}
              className="absolute top-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 lg:hidden"
              left
            />
            <CarouselButton
              onClick={() => setCur(ci(cur + 1))}
              className="absolute right-0 top-1/2 z-10 transform translate-x-1/2 -translate-y-1/2 lg:hidden"
            />
          </div>
          {/* indicators sm, md */}
          <CarouselIndicatorGroup className="mx-auto mt-2 w-min lg:hidden">
            {renderIndicators}
          </CarouselIndicatorGroup>
        </div>
        {/* text */}
        <div className="text-left md:col-start-1 md:row-start-1 md:self-center md:w-4/5">
          <h3 className="mt-7 mb-4 md:mt-0">{at(cur).title}</h3>
          <p>{at(cur).text}</p>
        </div>
        {/*   next image */}
        <div className="hidden lg:block">
          <div className="px-8">
            <div className="relative pb-13/10">
              <img
                src={at(cur + 1).image}
                alt="img"
                className="rounded-3xl img-ratio"
              />
              <CarouselButton
                onClick={() => setCur(ci(cur + 1))}
                className="hidden absolute right-0 top-1/2 z-10 transform translate-x-1/2 -translate-y-1/2 lg:flex"
              />
            </div>
            {/* IC large */}
            <CarouselIndicatorGroup className="mt-8 w-min">
              {renderIndicators}
            </CarouselIndicatorGroup>
          </div>
        </div>
      </div>
      {/* colored background */}
      <div className="absolute bottom-0 w-full h-full rounded-t-3xl -z-10 bg-light md:rounded-none" />
    </div>
  );
}

Cases.defaultProps = defaultProps;
