import { motion } from 'framer-motion';
import styled from 'styled-components';

const keywords = [
  { text: 'Conference', gradient: 'linear-gradient(90deg, #FF0066, #FF9999)' },
  { text: 'Development', gradient: 'linear-gradient(90deg, #FF6B00, #FFD700)' },
  { text: 'Growth', gradient: 'linear-gradient(90deg, #FFD700, #FFFF66)' },
  { text: 'Innovation', gradient: 'linear-gradient(90deg, #6600FF, #CC99FF)' },
  { text: 'Technology', gradient: 'linear-gradient(90deg, #FF00CC, #FFCCFF)' }
];
interface GradientTextProps {
  gradient: string;
}

const ServiceBanner = () => {
  return (
    <BannerContainer>
      <ContentWrapper>
        <AnimatedContainer
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            x: {
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop'
            }
          }}
        >
          <TextContainer>
            {keywords.map(({ text, gradient }, index) => (
              <GradientText key={index} gradient={gradient}>
                {text}
              </GradientText>
            ))}
          </TextContainer>
        </AnimatedContainer>
      </ContentWrapper>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
  height: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: linear-gradient(to right, #01f89f, #01c4e7);
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const AnimatedContainer = styled(motion.div)`
  display: flex;
  flex: 1;
`;

const TextContainer = styled.div`
  display: flex;
`;

const GradientText = styled.div<GradientTextProps>`
  font-family: 'NanumSquare', sans-serif;
  font-weight: 800;
  flex-shrink: 0;
  font-size: 2rem;
  white-space: nowrap;
  margin-right: 3rem;
  background-image: ${({ gradient }) => gradient};
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

export default ServiceBanner;
