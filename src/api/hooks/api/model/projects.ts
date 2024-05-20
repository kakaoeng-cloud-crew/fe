/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * cloud-crew-api
 * RAPA KAKAO ENG 4 Final Project-Cloud Crew
 * OpenAPI spec version: 1.0.0
 */
import type { ProjectsMetaData } from './projectsMetaData';

export interface Projects {
  /** 몽고DB에서 도큐먼트들에 자동으로 제공하는 고유 식별자 속성입니다. */
  _id: string;
  /** 생성된 날짜에 대한 정보를 저장하는 속성입니다. */
  day?: string;
  /** 생성된 프로젝트의 엔드포인트 주소 */
  end_point?: string;
  /** AWS S3 스토리지에 저장되는 버킷 주소 */
  helm_bucket_url?: string;
  /** 프로젝트에 관련된 추가 메타데이터. 키-값 쌍으로 구성되며, 값의 타입은 제한하지 않습니다. */
  meta_data?: ProjectsMetaData;
  /** 프로젝트 이름 속성으로 k8s의 네임스페이스, helm명으로 사용 및 인덱싱을 적용 */
  project_name: string;
  /** AWS S3 스토리지에 저장되는 버킷 주소 */
  values_bucket_url?: string;
}