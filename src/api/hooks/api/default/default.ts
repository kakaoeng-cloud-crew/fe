/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * cloud-crew-api
 * RAPA KAKAO ENG 4 Final Project-Cloud Crew
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type {
  DelProject200,
  DelProject404,
  DelProject500,
  GetEndpoint404,
  GetEndpoint500,
  GetProject200,
  GetProject404,
  GetProject500,
  GetProjects200,
  GetProjects404,
  GetProjects500,
  NewProject201,
  NewProject400,
  NewProject500,
  NewProjectBody,
} from '.././model';
import { useCustomInstance } from '../../../.instances/index';

/**
 * 현재 생성된 프로젝트 리스트를 모두 조회합니다. (AJAX로 비동기적 통신 구성 필요)
 * @summary 프로젝트 목록 전체 조회
 */
export const useGetProjectsHook = () => {
  const getProjects = useCustomInstance<GetProjects200>();

  return (signal?: AbortSignal) => {
    return getProjects({ url: `/api/v1/projects`, method: 'GET', signal });
  };
};

export const getGetProjectsQueryKey = () => {
  return [`/api/v1/projects`] as const;
};

export const useGetProjectsQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>,
  TError = GetProjects404 | GetProjects500,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>, TError, TData>>;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetProjectsQueryKey();

  const getProjects = useGetProjectsHook();

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>> = ({ signal }) =>
    getProjects(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetProjectsQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>>;
export type GetProjectsQueryError = GetProjects404 | GetProjects500;

/**
 * @summary 프로젝트 목록 전체 조회
 */
export const useGetProjects = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>,
  TError = GetProjects404 | GetProjects500,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetProjectsHook>>>, TError, TData>>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useGetProjectsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * 데이터를 받아 새로운 샌드박스 테스트 프로젝트 생성
 * @summary 새로운 샌드박스 테스트 프로젝트 생성하기
 */
export const useNewProjectHook = () => {
  const newProject = useCustomInstance<NewProject201>();

  return (newProjectBody: NewProjectBody) => {
    const formData = new FormData();
    if (newProjectBody.project_name !== undefined) {
      formData.append('project_name', newProjectBody.project_name);
    }
    if (newProjectBody.template !== undefined) {
      formData.append('template', newProjectBody.template);
    }
    if (newProjectBody.values !== undefined) {
      formData.append('values', newProjectBody.values);
    }

    return newProject({
      url: `/api/v1/projects`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });
  };
};

export const useNewProjectMutationOptions = <TError = NewProject400 | NewProject500, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>,
    TError,
    { data: NewProjectBody },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>,
  TError,
  { data: NewProjectBody },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const newProject = useNewProjectHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>,
    { data: NewProjectBody }
  > = (props) => {
    const { data } = props ?? {};

    return newProject(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type NewProjectMutationResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>>;
export type NewProjectMutationBody = NewProjectBody;
export type NewProjectMutationError = NewProject400 | NewProject500;

/**
 * @summary 새로운 샌드박스 테스트 프로젝트 생성하기
 */
export const useNewProject = <TError = NewProject400 | NewProject500, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>,
    TError,
    { data: NewProjectBody },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<ReturnType<typeof useNewProjectHook>>>,
  TError,
  { data: NewProjectBody },
  TContext
> => {
  const mutationOptions = useNewProjectMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Projects 리소스에서 단일 프로젝트 도큐먼트의 데이터를 조회하여 접속 end_point와 meta_data를 보여줍니다.
 * @summary 단일 프로젝트 상세 내용 조회
 */
export const useGetProjectHook = () => {
  const getProject = useCustomInstance<GetProject200>();

  return (projectId: string, signal?: AbortSignal) => {
    return getProject({ url: `/api/v1/projects/${projectId}`, method: 'GET', signal });
  };
};

export const getGetProjectQueryKey = (projectId: string) => {
  return [`/api/v1/projects/${projectId}`] as const;
};

export const useGetProjectQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>,
  TError = GetProject404 | GetProject500,
>(
  projectId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>, TError, TData>>;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetProjectQueryKey(projectId);

  const getProject = useGetProjectHook();

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>> = ({ signal }) =>
    getProject(projectId, signal);

  return { queryKey, queryFn, enabled: !!projectId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetProjectQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>>;
export type GetProjectQueryError = GetProject404 | GetProject500;

/**
 * @summary 단일 프로젝트 상세 내용 조회
 */
export const useGetProject = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>,
  TError = GetProject404 | GetProject500,
>(
  projectId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetProjectHook>>>, TError, TData>>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useGetProjectQueryOptions(projectId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * 주어진 project_name에 해당하는 프로젝트를 삭제합니다.
 * @summary 단일 프로젝트 삭제
 */
export const useDelProjectHook = () => {
  const delProject = useCustomInstance<DelProject200>();

  return (projectId: string) => {
    return delProject({ url: `/api/v1/projects/${projectId}`, method: 'DELETE' });
  };
};

export const useDelProjectMutationOptions = <TError = DelProject404 | DelProject500, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>,
    TError,
    { projectId: string },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>,
  TError,
  { projectId: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const delProject = useDelProjectHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>,
    { projectId: string }
  > = (props) => {
    const { projectId } = props ?? {};

    return delProject(projectId);
  };

  return { mutationFn, ...mutationOptions };
};

export type DelProjectMutationResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>>;

export type DelProjectMutationError = DelProject404 | DelProject500;

/**
 * @summary 단일 프로젝트 삭제
 */
export const useDelProject = <TError = DelProject404 | DelProject500, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>,
    TError,
    { projectId: string },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<ReturnType<typeof useDelProjectHook>>>,
  TError,
  { projectId: string },
  TContext
> => {
  const mutationOptions = useDelProjectMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Ingress Controller에 생성된 프로젝트의 엔드포인트를 추가하는 형식으로 엔드포인트를 제공할 수 있을 것으로 보입니다. 개념 증명 필요!
 * @summary 생성된 프로젝트의 엔드포인트 주소 접근
 */
export const useGetEndpointHook = () => {
  const getEndpoint = useCustomInstance<Blob>();

  return (projectName: string, signal?: AbortSignal) => {
    return getEndpoint({ url: `/api/v1/projects/${projectName}`, method: 'GET', responseType: 'blob', signal });
  };
};

export const getGetEndpointQueryKey = (projectName: string) => {
  return [`/api/v1/projects/${projectName}`] as const;
};

export const useGetEndpointQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>,
  TError = GetEndpoint404 | GetEndpoint500,
>(
  projectName: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>, TError, TData>>;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetEndpointQueryKey(projectName);

  const getEndpoint = useGetEndpointHook();

  const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>> = ({ signal }) =>
    getEndpoint(projectName, signal);

  return { queryKey, queryFn, enabled: !!projectName, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetEndpointQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>>;
export type GetEndpointQueryError = GetEndpoint404 | GetEndpoint500;

/**
 * @summary 생성된 프로젝트의 엔드포인트 주소 접근
 */
export const useGetEndpoint = <
  TData = Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>,
  TError = GetEndpoint404 | GetEndpoint500,
>(
  projectName: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<ReturnType<typeof useGetEndpointHook>>>, TError, TData>>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useGetEndpointQueryOptions(projectName, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};