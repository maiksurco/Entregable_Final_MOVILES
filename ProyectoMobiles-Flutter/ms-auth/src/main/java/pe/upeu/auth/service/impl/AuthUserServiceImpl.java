package pe.upeu.auth.service.impl;

import pe.upeu.auth.dto.AuthUserDto;

import pe.upeu.auth.entity.AuthUser;

import pe.upeu.auth.entity.TokenDto;
import pe.upeu.auth.repository.AuthRepository;
import pe.upeu.auth.security.JwtProvider;
import pe.upeu.auth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthUserServiceImpl implements AuthUserService {
    @Autowired
    AuthRepository authRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    @Override
    public AuthUser save(AuthUserDto authUserDto) {
        Optional<AuthUser> user = authRepository.findByUserName(authUserDto.getUserName());
        if (user.isPresent())
            return null;
        String password = passwordEncoder.encode(authUserDto.getPassword());
        AuthUser authUser = AuthUser.builder()
                .userName(authUserDto.getUserName())
                .password(password)
                .role(AuthUser.Role.USER_DEFAULT) // Asigna el rol por defecto
                .build();

        return authRepository.save(authUser);
    }

    @Override
    public TokenDto login(AuthUserDto authUserDto) {
        Optional<AuthUser> user = authRepository.findByUserName(authUserDto.getUserName());
        if (!user.isPresent())
            return null;
    
        if (passwordEncoder.matches(authUserDto.getPassword(), user.get().getPassword())) {
            // Devolver el token, id de usuario y rol
            return new TokenDto(jwtProvider.createToken(user.get()), user.get().getId(), user.get().getRole().name());
        }
        
        return null;
    }

    @Override
    public TokenDto validate(String token) {
        if (!jwtProvider.validate(token))
            return null;
    
        String username = jwtProvider.getUserNameFromToken(token);
        Optional<AuthUser> user = authRepository.findByUserName(username);
        if (!user.isPresent())
            return null;
    
        // Devolvemos el token, ID del usuario y rol
        return new TokenDto(token, user.get().getId(), user.get().getRole().name());
    }

    @Override
    public List<AuthUser> lista(){
        return authRepository.findAll();
    }

    @Override
    public Optional<AuthUser> buscarPorId(Integer id) {
        return authRepository.findById(id);
    }

    @Override
    public AuthUser actualizar(AuthUser authUser){
        return authRepository.save(authUser);
    }
}
